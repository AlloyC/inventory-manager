"use client";
import { updateProject } from "@/app/Provider/ProjectsProvider";
import { Project } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import React from "react";

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
  const handleUploadEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData) return;
    action(projectData!, images);
  };
  return <Button onClick={handleUploadEdit}>{text}</Button>;
};

export default SubmitButton;

// Create an Upload function for new Projects
