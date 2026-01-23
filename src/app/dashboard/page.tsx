import Cards from "./component/Cards";
import DetailedSection from "./component/DetailedSection";
import PageHeader from "./component/PageHeader";

function page() {
  return (
    <div>
      <PageHeader
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
