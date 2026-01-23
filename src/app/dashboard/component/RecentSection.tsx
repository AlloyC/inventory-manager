"use client";
import Button from "@/components/Button";
import PinnedCard from "./PinnedCard";
import { useProjects } from "@/app/Provider/ProjectsProvider";

const RecentSection = () => {
  const { projects } = useProjects();
  return (
    <aside className="md:row-start-1 md:row-end-3 w-full border rounded-xl col-start-1 md:col-start-8 col-end-13 p-4 justify-self-end">
      <div className="flex justify-between">
        <h3 className="flex gap-1 items-center">
          <span className="font-medium text-lg opacity-80">Recents</span>
        </h3>
        <Button text="new" className="shadow" />
      </div>
      <div className="mt-5 flex gap-3 flex-col">
        {projects.slice(0, 5).map((project, id) => (
          <PinnedCard
            name={project.name}
            status={project.status}
            className="border shadow py-2"
            key={id}
          />
        ))}
      </div>
    </aside>
  );
};

export default RecentSection;
