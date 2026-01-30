"use client";
import { LabelsProps } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

const StepsLabel = ({ projectData, setProjectData }: LabelsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="flex gap-2 items-baseline">
          <span className="font-medium mb-2 block">Steps</span>
        </h3>
        {projectData?.steps.length === 0 && (
          <Button
            variant={"ghost"}
            onClick={() =>
              setProjectData((prev) => ({
                ...prev!,
                steps: [{ step: "" }],
              }))
            }
          >
            <Plus />
          </Button>
        )}
      </div>
      {projectData?.steps.map((step, id) => (
        <div key={id}>
          <div className="flex items-center gap-2 mb-2">
            <Input
              type="text"
              onChange={(e) =>
                setProjectData((prev) => {
                  if (prev) {
                    const updatedSteps = [...prev.steps];
                    updatedSteps.splice(id, 1, { step: e.target.value });
                    return { ...prev, steps: updatedSteps };
                  }
                  return prev;
                })
              }
              value={step.step}
            />
            <Button
              type="button"
              title="Remove step"
              variant={"ghost"}
              size={"icon-sm"}
              className="rounded-full bg-slate-100 hover:bg-slate-200"
              onClick={() =>
                setProjectData((prev) =>
                  prev
                    ? {
                        ...prev,
                        steps: [
                          ...prev.steps.slice(0, id),
                          ...prev.steps.slice(id + 1),
                        ],
                      }
                    : prev,
                )
              }
            >
              <Minus />
            </Button>
          </div>
          {/* Add step button after last step if last step is not empty */}
          {id === projectData.steps.length - 1 &&
            projectData?.steps[id].step !== "" && (
              <Button
                type="button"
                variant={"ghost"}
                size={"icon-sm"}
                className="rounded-full bg-slate-100 hover:bg-slate-200"
                onClick={() =>
                  setProjectData((prev) =>
                    prev
                      ? {
                          ...prev,
                          steps: [...prev.steps, { step: "" }],
                        }
                      : prev,
                  )
                }
              >
                <Plus />
              </Button>
            )}
        </div>
      ))}
    </div>
  );
};

export default StepsLabel;
