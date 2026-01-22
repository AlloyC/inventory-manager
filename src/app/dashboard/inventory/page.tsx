"use client";
import { Input } from "@/components/ui/input";
import PageHeader from "../component/PageHeader";
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
import Image from "next/image";
import { Dot, Filter, MoreHorizontal } from "lucide-react";
import { useInventory, usePage } from "@/app/Provider/InventoryContext";

const page = () => {
  const { setPage, page } = usePage();
  const { inventory } = useInventory();
  if (!inventory) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <PageHeader title="Inventory" buttonOneText="New" buttonTwoText="CSV" />
      <div className="border-t-2 mt-5 grid">
        <div className="py-5 flex gap-2 justify-between items-center">
          <Input
            type="text"
            placeholder="search"
            className="max-w-80 focus-visible:ring-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 flex items-center gap-2">
              <span>Filter</span>
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
        </div>
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
            {inventory.map((component) => (
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
      </div>
    </div>
  );
};

export default page;
