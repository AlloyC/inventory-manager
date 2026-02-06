"use client";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dot, Filter, Grid, Grid2X2, List, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePage, useProjects } from "@/app/Provider/ProjectsProvider";
import Link from "next/link";
import supabase from "@/app/SupabaseCredentials";
import { useInventory } from "@/app/Provider/InventoryContext";
import DeleteProject from "@/app/modals/DeleteProject";
import { useState } from "react";

const ProjectsTable = () => {
  const { projects, pinned, getPinned, search, setSearch, setFilter } =
    useProjects();
  const { page, setPage } = usePage();
  const { totalInventoriesPages } = useInventory();
  const [deleteProject, setDeleteProject] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null,
  );

  const updatePinned = async (id?: string) => {
    try {
      if (!id || pinned.length >= 3) return;
      const { data, error } = await supabase
        .from("projects")
        .update({
          pinned: true,
        })
        .eq("id", id);
      if (error) {
        throw error;
      }
      console.log("Updated project pinned status:", data);
    } catch (error) {
      console.error("Error updating project pinned status:", error);
    }
    await getPinned();
  };
  const unpinProject = async (id?: string) => {
    try {
      if (!id) return;
      const { data, error } = await supabase
        .from("projects")
        .update({
          pinned: false,
        })
        .eq("id", id);
      if (error) {
        throw error;
      }
      console.log("Updated project pinned status:", data);
    } catch (error) {
      console.error("Error updating project pinned status:", error);
    }
    await getPinned();
  };
  const renameProject = async (id?: string, newName?: string) => {
    try {
      if (!id) return;
      const { data, error } = await supabase
        .from("projects")
        .update({
          name: newName,
        })
        .eq("id", id);
      if (error) {
        throw error;
      }
      console.log("Updated project name:", data);
    } catch (error) {
      console.error("Error updating project name: ", error);
    }
    await getPinned();
  };

  const handledelete = (id: string) => {
    setProjectIdToDelete(id);
    setDeleteProject((prev) => !prev);
  };

  return (
    <div>
      {deleteProject && projectIdToDelete && (
        <DeleteProject
          projectId={projectIdToDelete}
          setDeleteProject={() => handledelete("")}
        />
      )}
      <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between">
        <h3 className="text-nowrap pr-2">All Projects</h3>
        <div className="py-5 grid gap-2 grid-cols-[1fr_auto_auto] w-full max-w-96 items-center">
          <Input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[clamp(400px,max-content,256px)] focus-visible:ring-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 flex items-center py-2 md:py-1 border rounded gap-2">
              <span className="hidden md:inline-block text-sm font-medium">
                Filters
              </span>
              <Filter className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter("planning")}>
                Planning
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("running")}>
                Running
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("")}>
                All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="text-gray-500">
            {/* <List /> */}
            <Grid />
          </button>
        </div>
      </div>
      <div className="grid w-full">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Projects name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell className="">
                  <span className="line-clamp-1 text-ellipsis w-full h-5 hover:line-clamp-none hover:text-wrap hover:h-fit max-h-16">
                    {project.description}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${project.status === "completed" ? "text-green-400" : project.status === "running" ? "text-yellow-300" : "text-orange-600"}  flex items-center gap-2 font-medium`}
                  >
                    <Dot />
                    <span>{project.status}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="px-2 flex items-center gap-2">
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/projects/${project.id}`}
                          key={index}
                          className="w-full"
                        >
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/projects/edit-project?id=${project.id}`}
                          key={index}
                          className="w-full"
                        >
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      {!project.pinned ? (
                        <DropdownMenuItem
                          disabled={pinned.length >= 3}
                          onClick={() => updatePinned(project.id)}
                          className="cursor-pointer"
                        >
                          Pin
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => unpinProject(project.id)}
                          className="cursor-pointer"
                        >
                          Unpin
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="cursor-pointer">
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handledelete(project.id!)}
                        className="cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalInventoriesPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;
