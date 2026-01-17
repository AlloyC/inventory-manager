import { Pin } from "lucide-react";
import PinnedCard from "./PinnedCard";

const PinnedSection = () => {
  return (
    <div className="col-start-1 col-end-13 md:col-end-8 grid-row md:grid-rows-2 flex flex-col md:grid gap-4 h-max grid-cols-1 md:grid-cols-3 border rounded-xl p-3">
      <h3 className="flex gap-1 items-center col-span-3">
        <Pin className="w-4 h-5 -rotate-45" />
        <span className="font-medium text-lg opacity-80">Pinned Project</span>
      </h3>
      {Array.from({ length: 3 }).map((_, id) => (
        <PinnedCard key={id} />
      ))}
    </div>
  );
};

export default PinnedSection;
