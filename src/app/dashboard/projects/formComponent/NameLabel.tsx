"use client";
import { LabelsProps } from "@/app/types/type";
import { Input } from "@/components/ui/input";

const NameLabel = ({
  projectData,
  setProjectData,
}: LabelsProps) => {
  return (
    <label htmlFor="name">
      <span className="font-medium mb-2 block">Name</span>
      <Input
        id="name"
        name="name"
        className=""
        onChange={(e) =>
          setProjectData((prev) =>
            prev
              ? { ...prev, name: e.target.value }
              : {
                  name: e.target.value,
                  description: "",
                  status: "planning",
                  project_components: [],
                  steps: [],
                  pinned: false,
                },
          )
        }
        value={projectData?.name || ""}
      />
    </label>
  );
};

export default NameLabel;
