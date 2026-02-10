"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useInventory } from "../../../Provider/InventoryContext";
import { useEffect, useState } from "react";
import { Project } from "@/app/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { createProject, getProject } from "@/app/Provider/ProjectsProvider";
import NameLabel from "../formComponent/NameLabel";
import DescriptionLabel from "../formComponent/DescriptionLabel";
import ImagesLabel from "../formComponent/ImagesLabel";
import StatusLabel from "../formComponent/StatusLabel";
import ComponentsLabel from "../formComponent/ComponentsLabel";
import StepsLabel from "../formComponent/StepsLabel";
import SubmitButton from "../formComponent/SubmitButton";

const NewProjects = () => {
  const { inventory } = useInventory();
  const param = useSearchParams();
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const defualtData: Project = {
      name: "",
      description: "",
      status: "planning",
      project_components: [],
      steps: [],
      images: [],
      pinned: false,
    };
    setProjectData(defualtData);
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (!inventory || !projectData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex w-full items-center justify-between mb-5">
        <h2 className="font-medium text-lg">New Projects</h2>
        <Button onClick={handleBack} variant={"link"}>
          <ChevronLeft />
          <span>Back</span>
        </Button>
      </div>
      <form action="" className="px-3 flex flex-col gap-5">
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
          text={"Create Project"}
          projectData={projectData}
          images={images}
          action={(data, images) =>
            createProject(data, images).then(() =>
              router.push("/dashboard/projects"),
            )
          }
        />
      </form>
    </div>
  );
};

export default NewProjects;

// Fix the project_components to accept qty and make sure qty is handled properly in all places
// fix project data to allow steps to be independent of inventory components and project_components
