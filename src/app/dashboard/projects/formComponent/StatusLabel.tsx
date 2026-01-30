"use client";
import { LabelsProps } from "@/app/types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatusLabel = ({ projectData, setProjectData }: LabelsProps) => {
  return (
    <Select
      onValueChange={(e) =>
        setProjectData((prev) =>
          prev
            ? { ...prev, status: e as "planning" | "running" | "completed" }
            : prev,
        )
      }
      value={projectData?.status}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="planning" className="cursor-pointer">
          Planning
        </SelectItem>
        <SelectItem value="running" className="cursor-pointer">
          In progress
        </SelectItem>
        <SelectItem value="completed" className="cursor-pointer">
          Completed
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusLabel;
