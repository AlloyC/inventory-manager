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
import { Filter, Grid2X2, List, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProjectsTable = () => {
  const table = null; // Placeholder for table instance (e.g., from react-table)
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between">
        <h3>All Projects</h3>
        <div className="py-5 flex gap-2 justify-between items-center">
          <Input
            type="text"
            placeholder="search"
            className="max-w-80 min-w-64 focus-visible:ring-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 flex items-center py-2 md:py-1 border rounded gap-2">
              <span className="hidden md:inline-block">Filter</span>
              <Filter className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="text-gray-600">
            {/* <List /> */}
            <Grid2X2 />
          </button>
        </div>
      </div>
      <div>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Component name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Qty</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="font-medium">
                <Image
                  src="/assets/pngs/logo.png"
                  alt="Component Image"
                  width={20}
                  height={20}
                  className="rounded"
                />
              </TableCell>
              <TableCell>Component 1</TableCell>
              <TableCell>390j</TableCell>
              <TableCell>Shelf 41G</TableCell>
              <TableCell className="text-red-400 flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                <span>Low stock</span>
              </TableCell>
              <TableCell>50</TableCell>
              <TableCell>
                {/* <button className="ml-6 text-gray-500 hover:text-gray-600">
                    <Ellipsis />
                  </button> */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="px-2 flex items-center gap-2">
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Pin</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
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
