"use client";
import { Pin } from "lucide-react";
import PinnedCard from "./PinnedCard";
import { useProjects } from "@/app/Provider/ProjectsProvider";

const PinnedSection = () => {
  const { pinned } = useProjects();
  return (
    <div className="col-start-1 col-end-13 md:col-end-8 grid-row md:grid-rows-[auto_1fr] flex flex-col md:grid gap-4 h-max grid-cols-1 md:grid-cols-3 border rounded-xl p-3">
      <h3 className="flex gap-1 items-center col-span-3">
        <Pin className="w-4 h-5 -rotate-45" />
        <span className="font-medium text-lg opacity-80">Pinned Project</span>
      </h3>
      {pinned.length > 0 ? (
        pinned.map((project, id) => (
          <PinnedCard
            id={project.id}
            name={project.name!}
            status={project.status}
            key={id}
          />
        ))
      ) : (
        <div className="text-center w-full text-gray-500 font-medium col-span-3">
          No pinned project
        </div>
      )}
    </div>
  );
};

export default PinnedSection;
