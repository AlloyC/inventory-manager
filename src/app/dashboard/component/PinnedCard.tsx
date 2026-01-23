import { Button } from "@/components/ui/button";
import { Dot, ExternalLink, Link } from "lucide-react";

const PinnedCard = ({
  name,
  status,
  className,
}: {
  name: string;
  status?: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-full border rounded-lg p-3 ${status === "planning" ? "hover:border-yellow-400" : status === "completed" ? "hover:border-green-500" : "hover:border-orange-400"} ${className}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-sm opacity-95 line-clamp-1">{name}</h3>
        <Button className="bg-transparent -mt-2 -mr-3 text-gray-400 hover:text-gray-700 hover:bg-transparent">
          <ExternalLink />
        </Button>
      </div>
      {status && (
        <div
          className={`${status === "planning" ? "text-yellow-400" : status === "completed" ? "text-green-500" : "text-orange-400"} -mt-2 flex items-center justify-start  text-sm`}
        >
          <Dot className="-ml-2 mt-1" />
          <span>{status}</span>
        </div>
      )}
    </div>
  );
};

export default PinnedCard;
