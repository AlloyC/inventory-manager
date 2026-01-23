import PageHeader from "../component/PageHeader";
import PinnedSection from "../component/PinnedSection";
import ProjectsTable from "../component/ProjectsTable";

const page = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Projects"
        buttonTwoText="New project"
        solidTwo={true}
      />
      <PinnedSection />
      <ProjectsTable />
    </div>
  );
};

export default page;
