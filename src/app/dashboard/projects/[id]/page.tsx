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

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Partial<ProjectDetails> | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const project = await getProject(Number(id));

      if (!project) return;
      const images: string[] = [];
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
    })();
  }, [id]);

  if (id === "new-project") {
    router.push("/dashboard/projects/NewProject");
    return null;
  } else if (id === "edit-project") {
    router.push(`/dashboard/projects/edit-project?id=${id}`);
    return null;
  }

  if (!project) return null;

  return (
    <div className="space-y-3">
      <header className="flex justify-between items-center">
        <h2 className="font-medium text-lg">{project.name}</h2>
        <div className="flex gap-2 items-center">
          <Button type="button">Edit</Button>
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
        <p className="indent-4">{project.description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">Images</h3>
        <div className="flex items-center gap-5 px-4">
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
          <Table>
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
        <div>
          <h3 className="font-medium">Steps</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 flex items-center gap-2">
              <span>{project.status}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Planning</DropdownMenuItem>
              <DropdownMenuItem>In progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {project.steps ? (
            project.steps.map((step) => (
              <div key={step.step}>
                <Input type="checkbox" />
                <p>{step.step}</p>
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
