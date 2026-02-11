"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useInventory } from "../../../Provider/InventoryContext";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/app/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { getProject, updateProject } from "@/app/Provider/ProjectsProvider";
import NameLabel from "../formComponent/NameLabel";
import DescriptionLabel from "../formComponent/DescriptionLabel";
import ImagesLabel from "../formComponent/ImagesLabel";
import StatusLabel from "../formComponent/StatusLabel";
import ComponentsLabel from "../formComponent/ComponentsLabel";
import StepsLabel from "../formComponent/StepsLabel";
import SubmitButton from "../formComponent/SubmitButton";

const EditProjects = () => {
  const { inventory } = useInventory();
  const param = useSearchParams();
  const id = param.get("id");
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (id) {
      const defualtData: Project = {
        name: "",
        description: "",
        status: "planning",
        project_components: [],
        steps: [],
        images: [],
        id: id,
        pinned: false,
      };
      (async () => {
        const project = await getProject(Number(id));
        setProjectData(project[0] || defualtData);
      })();
    }
  }, [id]);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleEditProject = async (
    data: Project,
    images: { file: File; url: string }[],
  ) => {
    if (!projectData) return;
    if (data.name === "") {
      formRef.current?.querySelector("#name")?.classList.add("border-red-500");
      return;
    } else {
      formRef.current
        ?.querySelector("#name")
        ?.classList.remove("border-red-500");
    }

    if (data.description === "") {
      formRef.current
        ?.querySelector("#description")
        ?.classList.add("border-red-500");
      return;
    } else {
      formRef.current
        ?.querySelector("#description")
        ?.classList.remove("border-red-500");
    }

    await updateProject(data, images).then(() =>
      router.push("/dashboard/projects"),
    );
  };

  if (!inventory || !projectData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex w-full items-center justify-between mb-5">
        <h2 className="font-medium text-lg">Edit Projects</h2>
        <Button onClick={handleBack} variant={"link"}>
          <ChevronLeft />
          <span>Back</span>
        </Button>
      </div>
      <form ref={formRef} className="px-3 flex flex-col gap-5">
        <NameLabel projectData={projectData} setProjectData={setProjectData} />
        <DescriptionLabel
          projectData={projectData}
          setProjectData={setProjectData}
        />
        <ImagesLabel
          projectData={projectData}
          setProjectData={setProjectData}
          setImages={setImages}
        />
        <StatusLabel
          projectData={projectData}
          setProjectData={setProjectData}
        />
        <ComponentsLabel
          inventory={inventory}
          projectData={projectData}
          setProjectData={setProjectData}
        />
        <StepsLabel projectData={projectData} setProjectData={setProjectData} />
        <SubmitButton
          projectData={projectData}
          text={"Update Project"}
          images={images}
          action={handleEditProject}
        />
      </form>
    </div>
  );
};

export default EditProjects;

// Fix the project_components to accept qty and make sure qty is handled properly in all places
// fix project data to allow steps to be independent of inventory components and project_components
