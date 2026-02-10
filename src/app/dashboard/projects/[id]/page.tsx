"use client";
import { getProject, useProjects } from "@/app/Provider/ProjectsProvider";
import { Project as ProjectDetails } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Component, Dot, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { rename } from "../formComponent/ImagesLabel";
import supabase from "@/app/SupabaseCredentials";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Partial<ProjectDetails> | null>(null);
  const router = useRouter();
  const updateProjectStep = async (step: {
    completed: boolean;
    step: string;
  }) => {
    try {
      if (!project || !project.id) return;
      const { data, error } = await supabase
        .from("steps")
        .update({
          completed: step.completed,
          project_id: project.id,
        })
        .eq("project_id", project.id)
        .eq("step", step.step);
      if (error) {
        throw error;
      }
      console.log("Updated project step:", data);
    } catch (error) {
      console.error("Error updating project step:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const project = await getProject(Number(id));

      if (!project) return;
      const images: string[] = [];
      if (project[0].images && project[0].images.length > 0) {
        project[0].images?.forEach(async (img) => {
          await rename(img.url, images)
            .finally(() => {
              setProject(() => {
                project[0].images = images.map((url) => ({ url }));
                return { ...project[0] };
              });
            })
            .catch((error) => {
              console.error("Error renaming image URL:", error);
            });
        });
        console.log(id, project);
      } else {
        setProject(project[0]);
      }
    })();
  }, [id]);

  // useEffect(() => {
  //   console.log("Project steps changed:", project?.steps);
  // }, [project?.steps]);

  useEffect(() => {
    console.log("Project status changed:", project?.status);
    const updateProject = async () => {
      if (!project || !project.id) return;
      const { data, error } = await supabase
        .from("projects")
        .update({
          status: project.status,
        })
        .eq("id", project.id);
      if (error) {
        throw error;
      }
      console.log("Updated project status:", data);
    };
    updateProject().catch((error) => {
      console.error("Error updating project status:", error);
    });
  }, [project?.status]);

  if (id === "new-project") {
    router.push("/dashboard/projects/new-project");
    return null;
  } else if (id === "edit-project") {
    router.push(`/dashboard/projects/edit-project?id=${id}`);
    return null;
  }

  if (!project) return null;

  return (
    <div className="space-y-3 max-w-4xl md:shadow-lg dark:bg-accent/50 dark:text-white bg-slate-50 md:rounded-lg md:border md:p-5 mx-auto w-full grid grid-cols-1 overflow-x-hidden">
      <header className="flex justify-between items-center">
        <h2 className="font-medium text-lg">{project.name}</h2>
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            onClick={() =>
              router.push(`/dashboard/projects/edit-project?id=${id}`)
            }
          >
            Edit
          </Button>
          <Button
            type="button"
            variant={"ghost"}
            className="border-red-600 text-red-600 hover:border hover:text-red-600"
          >
            <Trash2 />
          </Button>
        </div>
      </header>
      <div className="space-y-2">
        <h3 className="font-medium">Description</h3>
        <p className=" pl-4">{project.description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Images</h3>
        <div className="flex items-center gap-5 px-4 overflow-x-auto">
          {project.images?.map((img) => (
            <Image
              key={img.url}
              width={200}
              height={200}
              className="rounded-xl"
              src={img.url}
              alt=""
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Components</h3>
        {project.project_components ? (
          <Table className="max-w-2xl ml-4">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Component name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.project_components.map((component) => (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">
                    {component.image ? (
                      <Image
                        src={component.image}
                        alt="Component Image"
                        width={20}
                        height={20}
                        className="rounded"
                      />
                    ) : (
                      <Component width={20} height={20} />
                    )}
                  </TableCell>
                  <TableCell>{component.name}</TableCell>
                  <TableCell>{component.location}</TableCell>
                  <TableCell>{component.qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No components. click on edit to add components.</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium">Steps</h3>
          <div className="flex items-center gap-1">
            <h3 className="font-medium">Status:</h3>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`"px-2 flex items-center hover:shadow-xl gap-2 font-medium shadow-sm rounded px-2 py-1 ${
                  project.status === "planning"
                    ? "bg-yellow-100 text-yellow-800"
                    : project.status === "running"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                <span className="capitalize">{project.status}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    setProject((prev) =>
                      prev ? { ...prev, status: "planning" } : null,
                    )
                  }
                  textValue="planning"
                >
                  Planning
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setProject((prev) =>
                      prev ? { ...prev, status: "running" } : null,
                    )
                  }
                  textValue="running"
                >
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setProject((prev) =>
                      prev ? { ...prev, status: "completed" } : null,
                    )
                  }
                  textValue="completed"
                >
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-4">
          {project.steps ? (
            project.steps.map((step, id) => (
              <div key={step.step} className="flex items-start gap-2 mb-2">
                <Input
                  type="checkbox"
                  id={`checkbox-${id}`}
                  checked={project.steps ? project.steps[id]?.completed : false}
                  onChange={() =>
                    setProject((prev) => {
                      if (!prev) return null;
                      const updatedSteps = prev.steps?.map((s, index) => {
                        if (index === id) {
                          const updatedS = {
                            ...s,
                            completed: s.completed === false ? true : false,
                          };
                          updateProjectStep(updatedS);
                          return updatedS;
                        }
                        return s;
                      });
                      return { ...prev, steps: updatedSteps };
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
                <label
                  htmlFor={`checkbox-${id}`}
                  className={`-mt-0.5 cursor-pointer ${step.completed ? "line-through text-gray-500" : ""}`}
                >
                  {step.step}
                </label>
              </div>
            ))
          ) : (
            <p>No steps. click on edit to add steps.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
