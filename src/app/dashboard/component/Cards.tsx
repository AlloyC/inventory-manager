"use client";
import { Card } from "@/app/types/type";
import SummaryCard from "./Card";

const summaries: Card[] = [
  { property: "Total component", value: 15272 },
  { property: "Running project", value: 1 },
  { property: "Pending projects", value: 2 },
  { property: "Total project", value: 25 },
];

const Cards = () => {
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
