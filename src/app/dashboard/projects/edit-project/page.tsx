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
import { getProject, updateProject } from "@/app/Provider/ProjectsProvider";
import Image from "next/image";

interface NewProjectProps extends Project {
  project_components: (Project["project_components"][number] & {
    qty?: number;
  })[];
  steps: { step: string }[];
}

const EditProjects = () => {
  const { inventory } = useInventory();
  const param = useSearchParams();
  const id = param.get("id");
  const [projectData, setProjectData] = useState<NewProjectProps | null>(null);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);

  useEffect(() => {
    if (id) {
      (async () => {
        const project = await getProject(Number(id));
        setProjectData(project[0]);
      })();
    }
  }, [id]);

  if (!inventory && !projectData) {
    return null;
  }
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => {
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { file, url }]);
        return url;
      });
      console.log("imageurls: ", imageUrls, projectData?.images);

      setProjectData((prev) =>
        prev
          ? {
              ...prev,
              images: [
                ...(prev.images || []),
                ...imageUrls.map((url) => ({ url })),
              ],
            }
          : {
              images: imageUrls.map((url) => ({ url })),
              name: "",
              description: "",
              status: "planning",
              project_components: [],
              steps: [],
            },
      );
    }
  };

  const handleUploadEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    updateProject(projectData!, images);
  };

  if (!inventory) {
    return null;
  }
  if (!projectData) {
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex w-full items-center justify-between mb-5">
        <h2 className="font-medium text-lg">Edit Projects</h2>
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
                      project_components: [],
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
                      project_components: [],
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
        <div>
          <label htmlFor="images">
            <span className="font-medium mb-2 block">Images</span>
            <Input
              type="file"
              id="images"
              multiple
              accept="image/*"
              maxLength={
                projectData.images?.length ? 5 - projectData.images?.length : 5
              }
              onChange={handleImagesChange}
              name="images"
            />
          </label>
          {projectData?.images && projectData.images.length > 0 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {projectData.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.url}
                    alt={`Project Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute top-1 right-1 rounded-full bg-white p-1"
                    onClick={() => {
                      // Remove image from images state
                      setImages((prev) => {
                        const updatedImages = prev.findIndex(
                          (img) => img.url === image.url,
                        );
                        if (updatedImages !== -1) {
                          const newImages = [...prev];
                          newImages.splice(updatedImages, 1);
                          return newImages;
                        }
                        return prev;
                      });
                      // Remove image from projectData images
                      setProjectData((prev) => {
                        if (prev && prev.images) {
                          const updatedImages = prev.images.filter(
                            (_, imgIndex) => imgIndex !== index,
                          );
                          return { ...prev, images: updatedImages };
                        }
                        return prev;
                      });
                    }}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
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
            {projectData?.project_components.length === 0 &&
              inventory.length !== 0 && (
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setProjectData((prev) =>
                      prev
                        ? {
                            ...prev,
                            project_components: [{ ...inventory[0], qty: 1 }],
                          }
                        : {
                            name: "",
                            description: "",
                            status: "planning",
                            project_components: [{ ...inventory[0], qty: 1 }],
                            steps: [],
                          },
                    )
                  }
                >
                  <Plus />
                </Button>
              )}
          </div>
          {projectData?.project_components.map((component, id) => (
            <div key={id}>
              <div className="flex items-center gap-2 mb-2">
                <Select
                  onValueChange={(e) =>
                    setProjectData((prev) => {
                      if (prev) {
                        const updatedComponents = [...prev.project_components];
                        const selectedComponent = inventory.find(
                          (comp) => comp.name === e,
                        );
                        if (selectedComponent) {
                          updatedComponents[id] = {
                            ...selectedComponent,
                            qty: 1,
                          };
                        }
                        return {
                          ...prev,
                          project_components: updatedComponents,
                        };
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
                        const updatedComponents = [...prev.project_components];
                        updatedComponents.splice(id, 1, {
                          ...updatedComponents[id],
                          qty: Number(e.target.value),
                        });
                        return {
                          ...prev,
                          project_components: updatedComponents,
                        };
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
                            project_components: [
                              ...prev.project_components.slice(0, id),
                              ...prev.project_components.slice(id + 1),
                            ],
                          }
                        : {
                            name: "",
                            description: "",
                            status: "planning",
                            project_components: [{ ...inventory[0], qty: 1 }],
                            steps: [],
                          },
                    )
                  }
                >
                  <Minus />
                </Button>
              </div>
              {id === projectData.project_components.length - 1 && (
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
                            project_components: [
                              ...prev.project_components,
                              { ...inventory[0], qty: 1 },
                            ],
                          }
                        : {
                            name: "",
                            description: "",
                            status: "planning",
                            project_components: [{ ...inventory[0], qty: 1 }],
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
                          steps: [{ step: "" }],
                        }
                      : {
                          name: "",
                          description: "",
                          status: "planning",
                          project_components: [{ ...inventory[0], qty: 1 }],
                          steps: [{ step: "" }],
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
        <Button onClick={handleUploadEdit}>Create Project</Button>
      </form>
    </div>
  );
};

export default EditProjects;

// Fix the project_components to accept qty and make sure qty is handled properly in all places
// fix project data to allow steps to be independent of inventory components and project_components
