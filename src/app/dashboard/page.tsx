import { Card } from "../types/type";
import SummaryCard from "./component/Card";
import Welcome from "./component/Welcome";

const summary: Card[] = [
  {
    className: "bg-green-400",
    property: "Total component:",
    value: 1642,
  },
  {
    className: "bg-blue-400",
    property: "Active Projects:",
    value: 12,
  },
  {
    className: "bg-red-400",
    property: "Low stock:",
    value: 2,
  },
];

function page() {
  return (
    <div className="px-10 py-3">
      <Welcome />
      <div className="flex gap-8">
        {summary.map((card, id) => (
          <SummaryCard
            className={card.className}
            property={card.property}
            value={card.value}
            key={card.property + id}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
