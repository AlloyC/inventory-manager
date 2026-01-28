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
import { ChevronLeft, Plus, X } from "lucide-react";
import { useInventory } from "../../../Provider/InventoryContext";
import { useEffect, useState } from "react";
import { Project } from "@/app/types/type";
import { useRouter } from "next/navigation";

interface NewProjectProps extends Project {
  components: (Project["components"][number] & { qty?: number })[];
}

const NewProjects = () => {
  const { inventory } = useInventory();
  const [newProject, setNewProject] = useState<NewProjectProps>({
    name: "",
    description: "",
    status: "planning",
    components: [],
  });
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (!inventory) {
    return null;
  }
  return (
    <div>
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
            className="max-w-96"
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
            onChange={(e) =>
              setNewProject((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={newProject?.description || ""}
          />
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
              <span>Components</span>
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
                    components: [
                      inventory.find(
                        (component) =>
                          component.name.toLocaleLowerCase() === "resistor",
                      ) ?? inventory[0],
                    ],
                  }))
                }
              >
                <Plus />
              </Button>
            )}
          </div>
          {newProject.components.map((component, id) => (
            <div key={id}>
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
                    console.log(prev.components[id], id);

                    const updatedComponents = [...prev.components];
                    const index = updatedComponents.findIndex(
                      (componentItem) => componentItem === component,
                    );
                    updatedComponents[index].qty = Number(e.target.value);
                    return { ...prev, components: updatedComponents };
                  })
                }
                value={id || 1}
              />
              {id === newProject.components.length - 1 && (
                <Button
                  type="button"
                  onClick={() =>
                    setNewProject((prev) => ({
                      ...prev,
                      components: [
                        ...prev.components,
                        inventory.find(
                          (component) =>
                            component.name.toLocaleLowerCase() === "resistor",
                        ) ?? inventory[0],
                      ],
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
// Duplicating effect of component qty
