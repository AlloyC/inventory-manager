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
import { Plus, X } from "lucide-react";
import { useInventory } from "../../../Provider/InventoryContext";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Project } from "@/app/types/type";
import { getProject } from "@/app/Provider/ProjectsProvider";

const NewProjects = () => {
  const { inventory } = useInventory();
  const [length, setLength] = useState(1);
  const param = useSearchParams();
  const id = param.get("id");
  const [projectData, setProjectData] = useState<Project | null>(null);

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

  if (!inventory || !projectData) {
    return null;
  }
  return (
    <div>
      <Button>
        <X />
      </Button>
      <h2>Edit Project</h2>
      <form action="">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="Project name"
          onChange={(e) =>
            setProjectData((prev) =>
              prev ? { ...prev, name: e.target.value } : null,
            )
          }
          value={projectData?.name || ""}
        />
        <label htmlFor="description">Description</label>
        <Input
          id="description"
          name="description"
          onChange={(e) =>
            setProjectData((prev) =>
              prev ? { ...prev, description: e.target.value } : null,
            )
          }
          value={projectData?.description || ""}
        />
        <label htmlFor="images">Images</label>
        <Input type="file" id="images" multiple max={5} name="images" />
        <Select
          onValueChange={(e) =>
            setProjectData((prev) =>
              prev
                ? { ...prev, status: e as "planning" | "running" | "completed" }
                : null,
            )
          }
          value={projectData?.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="running">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <div>
          <div>
            <h3>Components</h3>
          </div>
          {Array.from({ length }).map((_, id) => (
            <div key={id}>
              <Select
                onValueChange={(e) =>
                  setProjectData((prev) =>
                    prev
                      ? {
                          ...prev,
                          components: prev.components.map((comp, index) =>
                            index === id ? { ...comp, name: e } : comp,
                          ),
                        }
                      : null,
                  )
                }
                value={
                  projectData.components ? projectData.components[id].name : ""
                }
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
                // max={projectData?.components[id].current_qty}
                min={1}
                // value={projectData?.components[id].current_qty}
              />
              {id === length - 1 && (
                <Button onClick={() => setLength((prev) => prev + 1)}>
                  <Plus />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button>Update Project</Button>
      </form>
    </div>
  );
};

export default NewProjects;
