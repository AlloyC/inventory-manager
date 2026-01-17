import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Cards from "./component/Cards";
import DetailedSection from "./component/DetailedSection";

function page() {
  return (
    <div className="p-5 md:px-10">
      <header className="flex items-center justify-between">
        <PageTitle title="Dashboard" />
        <div className="flex gap-4">
          <Button text="New project" className={"hidden md:flex"} />
          <Button text="New component" />
        </div>
      </header>
      <Cards />
      <DetailedSection />
    </div>
  );
}

export default page;
