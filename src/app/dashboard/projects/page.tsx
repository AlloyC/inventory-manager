"use client";
import { useRouter } from "next/navigation";
import PageHeader from "../component/PageHeader";
import PinnedSection from "../component/PinnedSection";
import ProjectsTable from "../component/ProjectsTable";

const page = () => {
  const router = useRouter();
  const handleNewProject = () => {
    router.push("/dashboard/projects/new-project");
  };
  return (
    <div className="space-y-4">
      <PageHeader
        title="Projects"
        buttonTwoText="New project"
        solidTwo={true}
        buttonPropTwo={{ onClick: handleNewProject }}
      />
      <PinnedSection />
      <ProjectsTable />
    </div>
  );
};

export default page;
