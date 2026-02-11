"use client";
import { InventoryComponent, LabelsProps } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ComponentsLabel = ({
  projectData,
  setProjectData,
  inventory,
}: LabelsProps & { inventory: InventoryComponent[] }) => {
  return (
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
                        project_components: [
                          {
                            ...inventory[0],
                            qty: 1,
                            component_id: inventory[0].id || "",
                          },
                        ],
                      }
                    : null,
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
                        component_id: selectedComponent.id!,
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
              value={component?.qty || 1}
            />
            <Button
              type="button"
              title="Remove component"
              variant={"ghost"}
              size={"icon-sm"}
              className="rounded-full bg-slate-100 dark:bg-accent dark:hover:bg-sidebar hover:bg-slate-200"
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
                    : null,
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
              className="rounded-full bg-slate-100  dark:bg-accent dark:hover:bg-sidebar hover:bg-slate-200"
              onClick={() =>
                setProjectData((prev) =>
                  prev
                    ? {
                        ...prev,
                        project_components: [
                          ...prev.project_components,
                          {
                            ...inventory[0],
                            qty: 1,
                            component_id: inventory[0].id || "",
                          },
                        ],
                      }
                    : null,
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

export default ComponentsLabel;
