"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "../types/type";
import supabase from "../SupabaseCredentials";
import { getSession } from "./UserContext";

const Projects = createContext<{
  pinned: Partial<Project>[];
  projects: Project[];
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
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userSession.user.id)
      .eq("pinned", pinned || false)
      .order("last_modified", { ascending: true })
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) {
      throw error;
    }
    console.log("Fetched projects:", projects);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
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
        name,
        qty),
        steps (
        step)
      `,
      )
      .eq("user_id", userSession.user.id)
      .eq("id", id);
    if (error) {
      throw error;
    }
    console.log("Fetched projects:", projects);
    data = projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
  return data;
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
  } catch (error) {
    console.error("Error updating project:", error);
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
      images.some((img) => img.url === url.url),
    );
    console.log("Deleted images:", deletedImages);

    if (deletedImages.length > 0) {
      const { error } = await supabase.storage
        .from("project_images")
        .remove(deletedImages!.map((img) => img.url));
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error deleting project images:", error);
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
  }
  return { imageUrls, localUrls };
};

const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pinned, setPinned] = useState<Partial<Project>[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getProjects(page, 10).then((projects) => setProjects(projects));
  }, [page]);

  useEffect(() => {
    getProjects(1, 3, true)
      .then((projects) =>
        setPinned(
          projects.map((project) => ({
            id: project.id,
            name: project.name,
            status: project.status,
          })),
        ),
      )
      .catch((error) => {
        console.error("Error fetching pinned projects:", error);
      });
  }, []);

  return (
    <Projects.Provider value={{ pinned, projects }}>
      <Page.Provider value={{ setPage, page }}>{children}</Page.Provider>
    </Projects.Provider>
  );
};

export default ProjectsProvider;
