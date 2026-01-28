"use client";
import { Button } from "@/components/ui/button";
import PinnedCard from "./PinnedCard";
import { useProjects } from "@/app/Provider/ProjectsProvider";
import { useRouter } from "next/navigation";

const RecentSection = () => {
  const { projects } = useProjects();
  const router = useRouter();
  return (
    <aside className="md:row-start-1 md:row-end-3 w-full border rounded-xl col-start-1 md:col-start-8 col-end-13 p-4 justify-self-end">
      <div className="flex justify-between">
        <h3 className="flex gap-1 items-center">
          <span className="font-medium text-lg opacity-80">Recents</span>
        </h3>
        <Button
          onClick={() => router.push("/dashboard/projects/new-project")}
          className="shadow bg-transparent text-black border border-gray-300 hover:bg-transparent hover:border-gray-400"
        >
          New
        </Button>
      </div>
      <div className="mt-5 flex gap-3 flex-col">
        {projects.slice(0, 5).map((project, id) => (
          <PinnedCard
            name={project.name}
            status={project.status}
            id={project.id}
            className="border shadow py-2"
            key={id}
          />
        ))}
      </div>
    </aside>
  );
};

export default RecentSection;
