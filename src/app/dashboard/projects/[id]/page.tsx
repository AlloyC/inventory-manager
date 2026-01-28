"use client";
import { getProject, useProjects } from "@/app/Provider/ProjectsProvider";
import { Project as ProjectDetails } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Dot, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const project = await getProject(Number(id));
      console.log(id, project);
      setProject(project[0]);
    })();
  }, [id]);

  if (id === "new-project") {
    router.push("/dashboard/projects/NewProject");
    return null;
  } else if (id === "edit-project") {
    router.push(`/dashboard/projects/edit-project?id=${id}`);
    return null;
  }

  if (!project) return <div>project page {id}</div>;

  return (
    <div>
      <header>
        <h2>{project.name}</h2>
        <div>
          <Button type="button" className="">
            Edit
          </Button>
          <Button type="button" className="">
            <Trash2 />
          </Button>
        </div>
      </header>
      <div>
        <h3>Description</h3>
        <p>{project.description}</p>
      </div>
      <div>
        <h3>Images</h3>
        <div>
          {project.image?.map((img) => (
            <Image src={img} alt="" />
          ))}
        </div>
      </div>
      <div>
        <h3>Components</h3>
        {project.components ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Component name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Qty</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.components.map((component) => (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">
                    <Image
                      src={component.image}
                      alt="Component Image"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>{component.name}</TableCell>
                  <TableCell>{component.location}</TableCell>
                  <TableCell
                    className={`${component.status === "In Stock" ? "text-green-400" : component.status === "Low Stock" ? "text-yellow-400" : "text-red-400"} flex items-center gap-2 font-medium`}
                  >
                    <Dot />
                    <span>{component.status}</span>
                  </TableCell>
                  <TableCell>{component.current_qty}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="px-2 flex items-center gap-2">
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No components. click on edit to add components.</p>
        )}
      </div>
      <div>
        <div>
          <h3>Steps</h3>
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
              <div key={step}>
                <Input type="checkbox" />
                <p>{step}</p>
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
