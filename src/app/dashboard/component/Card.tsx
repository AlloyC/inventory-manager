import { Card } from "@/app/types/type";

const SummaryCard = ({ property, value }: Card) => {
  return (
    <div
      className={`rounded shadow border w-full max-h-36 p-6 flex flex-col gap-3`}
    >
      <h3 className="text-lg md:text-xl flex gap-2 items-center">
        <span>{property}</span>
      </h3>
      <p className="text-xl md:text-2xl font-medium">{value}</p>
    </div>
  );
};

export default SummaryCard;
