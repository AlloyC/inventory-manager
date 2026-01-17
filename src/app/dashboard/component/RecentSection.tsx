import Button from "@/components/Button";
import PinnedCard from "./PinnedCard";

const RecentSection = () => {
  return (
    <aside className="md:row-start-1 md:row-end-3 w-full border rounded-xl col-start-1 md:col-start-8 col-end-13 p-4">
      <div className="flex justify-between">
        <h3 className="flex gap-1 items-center">
          <span className="font-medium text-lg opacity-80">Recents</span>
        </h3>
        <Button text="new" />
      </div>
      <div className="mt-5 flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, id) => (
          <PinnedCard key={id} />
        ))}
      </div>
    </aside>
  );
};

export default RecentSection;
