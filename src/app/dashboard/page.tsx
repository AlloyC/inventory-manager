"use client";
import { useRouter } from "next/navigation";
import Cards from "./component/Cards";
import DetailedSection from "./component/DetailedSection";
import PageHeader from "./component/PageHeader";

function page() {
  const router = useRouter();
  return (
    <div>
      <PageHeader
        buttonPropOne={{
          onClick: () => router.push("/dashboard/projects/new-project"),
        }}
        buttonPropTwo={{
          onClick: () => router.push("/dashboard/inventory?new-component=true"),
        }}
        title="Dashboard"
        buttonOneText="New project"
        buttonTwoText="Add component"
        solidTwo={true}
      />
      <Cards />
      <DetailedSection />
    </div>
  );
}

export default page;
