import { Card } from "@/app/types/type";

const SummaryCard = ({ className, property, value, icon }: Card) => {
  return (
    <div
      className={`rounded w-full text-white max-w-72 h-36 p-6 flex flex-col gap-3 ${className}`}
    >
      <h3 className="text-2xl flex gap-2 items-center">
        <span>{icon}</span>
        <span>{property}</span>
      </h3>
      <p className="text-4xl font-medium">{value}</p>
    </div>
  );
};

export default SummaryCard;
