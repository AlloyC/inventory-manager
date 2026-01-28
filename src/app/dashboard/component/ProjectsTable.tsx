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

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/app/Provider/ProjectsProvider";
import Link from "next/link";

const ProjectsTable = () => {
  const { projects } = useProjects();
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between">
        <h3 className="text-nowrap pr-2">All Projects</h3>
        <div className="py-5 grid gap-2 grid-cols-[1fr_auto_auto] w-full max-w-96 items-center">
          <Input
            type="text"
            placeholder="search"
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
              <DropdownMenuItem>Planning</DropdownMenuItem>
              <DropdownMenuItem>Running</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
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
                      <DropdownMenuItem>Pin</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
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
            //   onClick={() => table.previousPage()}
            //   disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            //   onClick={() => table.nextPage()}
            //   disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;
