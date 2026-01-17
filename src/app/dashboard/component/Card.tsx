import { Card } from "@/app/types/type";

const SummaryCard = ({ property, value }: Card) => {
  return (
    <div className={`rounded border w-full h-36 p-6 flex flex-col gap-3`}>
      <h3 className="text-2xl flex gap-2 items-center">
        <span>{property}</span>
      </h3>
      <p className="text-3xl font-medium">{value}</p>
    </div>
  );
};

export default SummaryCard;
