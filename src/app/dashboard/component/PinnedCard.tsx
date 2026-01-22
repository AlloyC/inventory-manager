import { Button } from "@/components/ui/button";
import { Dot, Link } from "lucide-react";

const PinnedCard = ({ name, status }: { name: string; status: string }) => {
  return (
    <div className="w-full border rounded-lg p-3">
      <div className="flex items-start justify-between">
        <h3 className="font-medium">{name}</h3>
        <Button className="bg-transparent -mt-2 text-gray-400 hover:text-gray-700 hover:bg-transparent">
          <Link />
        </Button>
      </div>
      {/* ellipses after  ch */}
      {status && (
        <div
          className={`${status === "planning" ? "text-yellow-400" : status === "completed" ? "text-green-500" : "text-orange-400"} flex items-center justify-start`}
        >
          <Dot className="-ml-2 mt-1" />
          <span>{status}</span>
        </div>
      )}
    </div>
  );
};

export default PinnedCard;
