import { Button } from "@/components/ui/button";
import { Dot, ExternalLink } from "lucide-react";
import Link from "next/link";

const PinnedCard = ({
  name,
  status,
  className,
  id,
}: {
  name: string;
  status?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <Link
      href={`/dashboard/projects/${id}`}
      className={`w-full border rounded-lg p-3 ${status === "planning" ? "hover:border-yellow-400" : status === "completed" ? "hover:border-green-500" : "hover:border-orange-400"} ${className}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-sm opacity-95 line-clamp-1">{name}</h3>
        <Button className="bg-transparent -mt-2 -mr-3 text-gray-400 hover:bg-transparent">
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
    </Link>
  );
};

export default PinnedCard;
