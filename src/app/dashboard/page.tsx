import Cards from "./component/Cards";
import DetailedSection from "./component/DetailedSection";
import PageHeader from "./component/PageHeader";

function page() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        buttonOneText="New project"
        buttonTwoText="New component"
      />
      <Cards />
      <DetailedSection />
    </div>
  );
}

export default page;
