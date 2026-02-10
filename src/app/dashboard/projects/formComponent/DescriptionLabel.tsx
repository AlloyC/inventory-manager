"use client";
import { LabelsProps } from "@/app/types/type";
import { Input } from "@/components/ui/input";

const DescriptionLabel = ({ projectData, setProjectData }: LabelsProps) => {
  return (
    <label htmlFor="description">
      <span className="font-medium mb-2 block">Description</span>
      <Input
        id="description"
        name="description"
        maxLength={100}
        onChange={(e) =>
          setProjectData((prev) =>
            prev
              ? {
                  ...prev,
                  description: e.target.value,
                }
              : {
                  name: "",
                  description: e.target.value,
                  status: "planning",
                  project_components: [],
                  steps: [],
                  pinned: false,
                },
          )
        }
        value={projectData?.description || ""}
      />
      <span className="text-right relative right-0 w-full inline-block text-sm mt-2">
        {projectData?.description.length || 0}/100
      </span>
    </label>
  );
};

export default DescriptionLabel;
