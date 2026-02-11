"use client";
import { useInventory } from "@/app/Provider/InventoryContext";
import { useProjects } from "@/app/Provider/ProjectsProvider";
import { Project } from "@/app/types/type";
import SubmitBtn from "@/components/submitBtn";
import { useState } from "react";

const SubmitButton = ({
  projectData,
  images,
  text,
  action,
}: {
  projectData: Project | null;
  images: { file: File; url: string }[];
  text: string;
  action: (
    data: Project,
    images: {
      file: File;
      url: string;
    }[],
  ) => Promise<void>;
}) => {
  const [activeState, setActiveState] = useState(false);
  const { setRefresh: setInventoryRefresh } = useInventory();
  const { setRefresh: setProjectsRefresh } = useProjects();

  const handleUploadEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData) return;
    (() => setActiveState(true))();
    action(projectData!, images)
      .then(() => {
        setInventoryRefresh((prev) => !prev);
        setProjectsRefresh((prev) => !prev);
      })
      .finally(() => setActiveState(false));
  };
  return (
    <SubmitBtn
      text={text}
      action={handleUploadEdit}
      active={!!projectData && activeState}
    />
  );
};

export default SubmitButton;

// Create an Upload function for new Projects
