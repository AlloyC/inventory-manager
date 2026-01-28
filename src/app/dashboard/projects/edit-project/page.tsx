"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Minus, Plus, X } from "lucide-react";
import { useInventory } from "../../../Provider/InventoryContext";
import { useEffect, useState } from "react";
import { Project } from "@/app/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { getProject } from "@/app/Provider/ProjectsProvider";

interface NewProjectProps extends Project {
  components: (Project["components"][number] & { qty?: number })[];
  steps: string[];
}

const EditProjects = () => {
  const { inventory } = useInventory();
  const [length, setLength] = useState(1);
  const param = useSearchParams();
  const id = param.get("id");
  const [projectData, setProjectData] = useState<NewProjectProps | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const project = await getProject(Number(id));
        setProjectData(project[0]);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (projectData) {
      setLength(projectData.components?.length || 0);
    }
  }, [projectData]);

  if (!inventory && !projectData) {
    return null;
  }
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (!inventory) {
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex w-full items-center justify-between mb-5">
        <h2 className="font-medium text-lg">New Projects</h2>
        <Button onClick={handleBack} variant={"link"}>
          <ChevronLeft />
          <span>Back</span>
        </Button>
      </div>
      <form action="" className="px-3 flex flex-col gap-5">
        <label htmlFor="name">
          <span className="font-medium mb-2 block">Name</span>
          <Input
            id="name"
            name="Project name"
            className=""
            onChange={(e) =>
              setProjectData((prev) =>
                prev
                  ? { ...prev, name: e.target.value }
                  : {
                      name: e.target.value,
                      description: "",
                      status: "planning",
                      components: [],
                      steps: [],
                    },
              )
            }
            value={projectData?.name || ""}
          />
        </label>
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
                      components: [],
                      steps: [],
                    },
              )
            }
            value={projectData?.description || ""}
          />
          <span className="text-right relative right-0 w-full inline-block text-sm mt-2">
            {projectData?.description.length || 0}/100
          </span>
        </label>
        <label htmlFor="images">
          <span className="font-medium mb-2 block">Images</span>
          <Input type="file" id="images" multiple max={5} name="images" />
        </label>
        <Select value={projectData?.status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="planning"
              className="text-gray-400 cursor-pointer"
            >
              Planning
            </SelectItem>
            <SelectItem
              value="in progress"
              className="text-gray-400 cursor-pointer"
            >
              In progress
            </SelectItem>
            <SelectItem
              value="completed"
              className="text-gray-400 cursor-pointer"
            >
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="flex gap-2 items-baseline">
              <span className="font-medium mb-2 block">Components</span>
              {inventory.length === 0 && (
                <span className="text-xs text-red-500">
                  no components available, add new components to your inventory
                  first
                </span>
              )}
            </h3>
            {projectData?.components.length === 0 && inventory.length !== 0 && (
              <Button
                variant={"ghost"}
                onClick={() =>
                  setProjectData((prev) =>
                    prev
                      ? {
                          ...prev,
                          components: [inventory[0]],
                        }
                      : {
                          name: "",
                          description: "",
                          status: "planning",
                          components: [inventory[0]],
                          steps: [],
                        },
                  )
                }
              >
                <Plus />
              </Button>
            )}
          </div>
          {projectData?.components.map((component, id) => (
            <div key={id}>
              <div className="flex items-center gap-2 mb-2">
                <Select
                  onValueChange={(e) =>
                    setProjectData((prev) => {
                      if (prev) {
                        const updatedComponents = [...prev.components];
                        const selectedComponent = inventory.find(
                          (comp) => comp.name === e,
                        );
                        if (selectedComponent) {
                          updatedComponents[id] = selectedComponent;
                        }
                        return { ...prev, components: updatedComponents };
                      }
                      return prev;
                    })
                  }
                  value={component.name}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add component" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map((component) => (
                      <SelectItem value={component.name} key={component.name}>
                        {component.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  max={component.current_qty}
                  min={1}
                  onChange={(e) =>
                    setProjectData((prev) => {
                      if (prev) {
                        const updatedComponents = [...prev.components];
                        updatedComponents.splice(id, 1, {
                          ...updatedComponents[id],
                          qty: Number(e.target.value),
                        });
                        return { ...prev, components: updatedComponents };
                      }
                      return prev;
                    })
                  }
                  value={component.qty || 1}
                />
                <Button
                  type="button"
                  title="Remove component"
                  variant={"ghost"}
                  size={"icon-sm"}
                  className="rounded-full bg-slate-100 hover:bg-slate-200"
                  onClick={() =>
                    setProjectData((prev) =>
                      prev
                        ? {
                            ...prev,
                            components: [
                              ...prev.components.slice(0, id),
                              ...prev.components.slice(id + 1),
                            ],
                          }
                        : {
                            name: "",
                            description: "",
                            status: "planning",
                            components: [inventory[0]],
                            steps: [],
                          },
                    )
                  }
                >
                  <Minus />
                </Button>
              </div>
              {id === projectData.components.length - 1 && (
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
                            components: [...prev.components, inventory[0]],
                          }
                        : {
                            name: "",
                            description: "",
                            status: "planning",
                            components: [inventory[0]],
                            steps: [],
                          },
                    )
                  }
                >
                  <Plus />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="flex gap-2 items-baseline">
              <span className="font-medium mb-2 block">Steps</span>
            </h3>
            {projectData?.steps.length === 0 && (
              <Button
                variant={"ghost"}
                onClick={() =>
                  setProjectData((prev) =>
                    prev
                      ? {
                          ...prev,
                          steps: [""],
                        }
                      : {
                          name: "",
                          description: "",
                          status: "planning",
                          components: [inventory[0]],
                          steps: [],
                        },
                  )
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
                        updatedSteps.splice(id, 1, e.target.value);
                        return { ...prev, steps: updatedSteps };
                      }
                      return prev;
                    })
                  }
                  value={step}
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
                projectData?.steps[id] !== "" && (
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
                              steps: [...prev.steps, ""],
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
        <Button>Create Project</Button>
      </form>
    </div>
  );
};

export default EditProjects;
