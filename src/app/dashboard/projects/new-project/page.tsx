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
import { useRouter } from "next/navigation";
// fix supabase error i.e components and steps should not be optional in new project
interface NewProjectProps extends Project {
  components: (Project["components"][number] & { qty?: number })[];
  steps: string[];
}

const NewProjects = () => {
  const { inventory } = useInventory();
  const [newProject, setNewProject] = useState<NewProjectProps>({
    name: "",
    description: "",
    status: "planning",
    components: [],
    steps: [],
  });
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
              setNewProject((prev) => ({ ...prev, name: e.target.value }))
            }
            value={newProject?.name || ""}
          />
        </label>
        <label htmlFor="description">
          <span className="font-medium mb-2 block">Description</span>
          <Input
            id="description"
            name="description"
            maxLength={100}
            onChange={(e) =>
              setNewProject((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={newProject?.description || ""}
          />
          <span className="text-right relative right-0 w-full inline-block text-sm mt-2">
            {newProject.description.length}/100
          </span>
        </label>
        <label htmlFor="images">
          <span className="font-medium mb-2 block">Images</span>
          <Input type="file" id="images" multiple max={5} name="images" />
        </label>
        <Select value={newProject?.status}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem
              value="in progress"
              className="text-gray-400 cursor-not-allowed"
              disabled
            >
              In progress
            </SelectItem>
            <SelectItem
              value="completed"
              className="text-gray-400 cursor-not-allowed"
              disabled
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
            {newProject.components.length === 0 && inventory.length !== 0 && (
              <Button
                variant={"ghost"}
                onClick={() =>
                  setNewProject((prev) => ({
                    ...prev,
                    components: [inventory[0]],
                  }))
                }
              >
                <Plus />
              </Button>
            )}
          </div>
          {newProject.components.map((component, id) => (
            <div key={id}>
              <div className="flex items-center gap-2 mb-2">
                <Select
                  onValueChange={(e) =>
                    setNewProject((prev) => {
                      const updatedComponents = [...prev.components];
                      const selectedComponent = inventory.find(
                        (comp) => comp.name === e,
                      );
                      if (selectedComponent) {
                        updatedComponents[id] = selectedComponent;
                      }
                      return { ...prev, components: updatedComponents };
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
                    setNewProject((prev) => {
                      const updatedComponents = [...prev.components];
                      updatedComponents.splice(id, 1, {
                        ...updatedComponents[id],
                        qty: Number(e.target.value),
                      });
                      return { ...prev, components: updatedComponents };
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
                    setNewProject((prev) => ({
                      ...prev,
                      components: [
                        ...prev.components.slice(0, id),
                        ...prev.components.slice(id + 1),
                      ],
                    }))
                  }
                >
                  <Minus />
                </Button>
              </div>
              {id === newProject.components.length - 1 && (
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"icon-sm"}
                  className="rounded-full bg-slate-100 hover:bg-slate-200"
                  onClick={() =>
                    setNewProject((prev) => ({
                      ...prev,
                      components: [...prev.components, inventory[0]],
                    }))
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
            {newProject.steps.length === 0 && (
              <Button
                variant={"ghost"}
                onClick={() =>
                  setNewProject((prev) => ({
                    ...prev,
                    steps: [""],
                  }))
                }
              >
                <Plus />
              </Button>
            )}
          </div>
          {newProject.steps.map((step, id) => (
            <div key={id}>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="text"
                  onChange={(e) =>
                    setNewProject((prev) => {
                      const updatedSteps = [...prev.steps];
                      updatedSteps.splice(id, 1, e.target.value);
                      return { ...prev, steps: updatedSteps };
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
                    setNewProject((prev) => ({
                      ...prev,
                      steps: [
                        ...prev.steps.slice(0, id),
                        ...prev.steps.slice(id + 1),
                      ],
                    }))
                  }
                >
                  <Minus />
                </Button>
              </div>
              {/* Add step button after last step if last step is not empty */}
              {id === newProject.steps.length - 1 &&
                newProject.steps[id] !== "" && (
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon-sm"}
                    className="rounded-full bg-slate-100 hover:bg-slate-200"
                    onClick={() =>
                      setNewProject((prev) => ({
                        ...prev,
                        steps: [...prev.steps, ""],
                      }))
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

export default NewProjects;
