"use client";
import SummaryCard from "./Card";
import { useInventory } from "@/app/Provider/InventoryContext";

const Cards = () => {
  const { summaries } = useInventory();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-md md:max-w-full mx-auto gap-4 mt-8 md:mt-5">
      {summaries.map((summary, id) => (
        <SummaryCard
          key={id}
          property={summary.property}
          value={summary.value}
        />
      ))}
    </div>
  );
};

export default Cards;
