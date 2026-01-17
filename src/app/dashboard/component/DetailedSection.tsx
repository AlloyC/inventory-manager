import LowStockSection from "./LowStockSection";
import PinnedSection from "./PinnedSection";
import RecentSection from "./RecentSection";
import SummaryComponentsSection from "./SummaryComponentsSection";

const DetailedSection = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr] gap-5 w-full max-w-md md:max-w-none mx-auto mt-5">
      <PinnedSection />
      <RecentSection />
      <SummaryComponentsSection />
      <LowStockSection />
    </div>
  );
};

export default DetailedSection;
