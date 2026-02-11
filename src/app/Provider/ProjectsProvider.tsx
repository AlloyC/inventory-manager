"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { InventoryComponent, Project } from "../types/type";
import supabase from "../SupabaseCredentials";
import { getSession } from "./UserContext";
import { toast } from "react-toastify";

const Projects = createContext<{
  pinned: Partial<Project>[];
  projects: Project[];
  getPinned: () => Promise<void>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

const Page = createContext<{
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
} | null>(null);

export const useProjects = () => {
  const context = useContext(Projects);

  if (!context) throw new Error("Component is not a child of Project context.");
  return context;
};

export const usePage = () => {
  const context = useContext(Page);
  if (!context) {
    throw new Error("not a child of page context");
  }
  return context;
};

const getProjects = async (
  page: number,
  pageSize: number,
  pinned?: boolean,
  filter?: string[],
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    if (filter) {
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userSession.user.id)
        .in("status", filter || ["completed", "running", "planning"])
        .order("last_modified", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        throw error;
      }
      console.log("Fetched projects:", projects);
      return (projects || []) as Project[];
    } else {
      const { data: projects, error } = pinned
        ? await supabase
            .from("projects")
            .select("*")
            .eq("user_id", userSession.user.id)
            .eq("pinned", pinned)
            .order("last_modified", { ascending: false })
            .range((page - 1) * pageSize, page * pageSize - 1)
        : await supabase
            .from("projects")
            .select("*")
            .eq("user_id", userSession.user.id)
            .order("last_modified", { ascending: false })
            .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) {
        throw error;
      }
      console.log("Fetched projects:", projects);
      return (projects || []) as Project[];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [] as Project[];
  }
};
const searchProjects = async (
  page: number,
  pageSize: number,
  searchQuery: string,
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userSession.user.id)
      .order("last_modified", { ascending: false })
      .ilike("name", `%${searchQuery}%`)
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) {
      throw error;
    }
    console.log("Fetched projects:", projects);
    return (projects || []) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [] as Project[];
  }
};

export const getProject = async (id: number) => {
  let data: Project[] = [];
  const userSession = await getSession();
  if (!userSession) return data;
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select(
        `
    *,
    project_components (
      id,
      component_id,
      name,
      qty,
      components (
        location
      )
    ),
    steps (
      step,
      completed
    ),
    images (
      url
    )
  `,
      )
      .eq("user_id", userSession.user.id)
      .eq("id", id);

    if (error) {
      throw error;
    }

    const formatted = projects.map((p) => ({
      ...p,
      project_components: p.project_components.map((pc: any) => ({
        ...pc,
        location: pc.components?.location,
      })),
    }));
    data = formatted || [];

    console.log("Fetched projects:", formatted);
    // data = projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
  return data;
};

const updateInventoryComponent = async (
  component: Partial<InventoryComponent> & {
    qty: number;
    component_id: string;
    location?: string;
  },
) => {
  try {
    const qty = component.current_qty! - component.qty;
    let status: string;
    if (qty <= 0) {
      status = "Out of Stock";
    } else if (qty <= component.low_stock_threshold!) {
      status = "Low Stock";
    } else {
      status = "In Stock";
    }

    const { error: updateError } = await supabase
      .from("components")
      .update({
        current_qty: qty,
        status: status,
      })
      .eq("id", component.id);
    if (updateError) {
      throw updateError;
    }
  } catch (error) {
    console.error("Error updating inventory component:", error);
  }
};

export const updateProject = async (
  data: Project,
  images: {
    file: File;
    url: string;
  }[],
) => {
  try {
    const urls = await getExistingProjectImages(data.id!);
    data?.images && (await deleteExistingProjectImages(urls, data.images));
    const result = await uploadImagesToSupabase(images, data.id!);
    if (!result) return;
    const { imageUrls, localUrls } = result;

    // Update data.images with the new URLs
    for (let i = 0; i < imageUrls.length; i++) {
      const index = data.images?.findIndex((img) => img.url === localUrls[i]);
      if (index !== -1 && index !== undefined) {
        data.images![index].url = imageUrls[i].url;
      }
    }

    console.log("Final project data to update:", data);

    const { error } = await supabase.rpc("update_project_with_components", {
      p_project_id: Number(data.id),
      p_project_name: data.name,
      p_project_description: data.description,
      p_project_status: data.status,
      p_components: data.project_components,
      p_steps: data.steps,
      p_images: data.images,
    });
    if (error) {
      throw error;
    }

    // Update inventory components based on project components
    for (const component of data.project_components) {
      await updateInventoryComponent(component);
    }
    toast.success("Project updated successfully");
  } catch (error) {
    console.error("Error updating project:", error);
    toast.error("Error updating project");
  }
};

export const createProject = async (
  data: Project,
  images: {
    file: File;
    url: string;
  }[],
) => {
  try {
    console.log("Final project data to update:", data);

    const { data: newData, error } = await supabase.rpc(
      "create_project_with_details",
      {
        p_project_name: data.name,
        p_project_description: data.description,
        p_project_status: data.status,
        p_components: data.project_components,
        p_steps: data.steps,
      },
    );
    if (error) {
      throw error;
    }

    console.log("New project created with ID:", newData);

    const result = await uploadImagesToSupabase(images, newData);
    if (!result) return;
    const { imageUrls } = result;
    const imagesData = imageUrls.map((img) => ({
      url: img.url,
      project_id: newData,
    }));

    // insert supabase image with the new URLs
    const { data: imageData, error: insertError } = await supabase
      .from("images")
      .insert(imagesData);

    if (insertError) {
      throw insertError;
    }

    // Update inventory components based on project components
    for (const component of data.project_components) {
      await updateInventoryComponent(component);
    }
    toast.success("Project created successfully");
  } catch (error) {
    console.error("Error creating project:", error);
    toast.error("Error creating project");
  }
};

const getExistingProjectImages = async (projectId: string) => {
  try {
    const { data: urls, error: urlsError } = await supabase
      .from("images")
      .select(
        `
        url
      `,
      )
      .eq("project_id", projectId);
    if (urlsError) {
      throw urlsError;
    }
    return urls || [];
  } catch (error) {
    console.error("Error fetching project images:", error);
  }
  return [];
};

const deleteExistingProjectImages = async (
  urls: { url: string }[],
  images: {
    url: string;
  }[],
) => {
  try {
    const deletedImages = urls?.filter((url) =>
      images.find((img) => img.url === url.url) ? false : true,
    );
    console.log("Deleted images:", deletedImages);

    if (deletedImages.length > 0) {
      const { error } = await supabase.storage
        .from("project_images")
        .remove(deletedImages!.map((img) => img.url));
      if (error) {
        throw error;
      }
    } else if (urls.length > 0 && images.length === 0) {
      const { error } = await supabase.storage
        .from("project_images")
        .remove(urls!.map((img) => img.url));
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error deleting project images:", error);
    toast.error("Error deleting project images");
  }
};

const uploadImagesToSupabase = async (
  images: {
    file: File;
    url: string;
  }[],
  projectId: string,
) => {
  const imageUrls = [];
  const localUrls = [];
  try {
    const userSession = await getSession();
    if (!userSession) return;
    for (const image of images) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project_images")
        .upload(
          `${userSession.user.id}/${projectId}/${image.file.name}`,
          image.file,
        );
      if (uploadError) {
        throw uploadError;
      }
      imageUrls.push({ url: uploadData!.path });
      localUrls.push(image.url);
    }
    console.log("Uploaded image URLs:", imageUrls);
  } catch (error) {
    console.error("Error uploading images:", error);
    toast.error("Error uploading images");
  }
  return { imageUrls, localUrls };
};

const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pinned, setPinned] = useState<Partial<Project>[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const getPinned = async () => {
    const projects = await getProjects(1, 3, true);
    setPinned(
      projects.map((project) => ({
        id: project.id,
        name: project.name,
        status: project.status,
      })),
    );

    // .then((projects) =>
    //   setPinned(
    //     projects.map((project) => ({
    //       id: project.id,
    //       name: project.name,
    //       status: project.status,
    //     })),
    //   ),
    // )
    // .catch((error) => {
    //   console.error("Error fetching pinned projects:", error);
    // });
  };

  useEffect(() => {
    getProjects(page, 10, undefined, filter !== "" ? [filter] : undefined).then(
      (projects) => setProjects(projects),
    );
    const timeout = setTimeout(() => setRefresh(false), 500);
    return () => clearTimeout(timeout);
  }, [page, pinned, refresh, filter]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (search !== "") {
      timeout = setTimeout(
        () =>
          searchProjects(page, 10, search).then((projects) =>
            setProjects(projects),
          ),
        500,
      );
    } else {
      setRefresh(true);
    }

    return () => clearTimeout(timeout);
  }, [page, search]);

  useEffect(() => {
    getPinned();
    const timeout = setTimeout(() => setRefresh(false), 500);
    return () => clearTimeout(timeout);
  }, [refresh]);

  // Try to get it to reload after pinning a project

  return (
    <Projects.Provider
      value={{
        pinned,
        projects,
        getPinned,
        setRefresh,
        search,
        setSearch,
        setFilter,
      }}
    >
      <Page.Provider value={{ setPage, page }}>{children}</Page.Provider>
    </Projects.Provider>
  );
};

export default ProjectsProvider;
