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
import { Dot, Filter, MoreHorizontal, Search } from "lucide-react";
import {
  searchInventory,
  statusType,
  useInventory,
  usePage,
} from "@/app/Provider/InventoryContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InventoryComponent } from "@/app/types/type";
import NewComponent from "@/app/modals/NewComponent";
import { Button } from "@/components/ui/button";
import DeleteInventory from "@/app/modals/DeleteInventory";

const page = () => {
  const { setPage, page, setFilter } = usePage();
  const { totalInventoriesPages, setSearch, search } = useInventory();
  const router = useRouter();
  const searchParam = useSearchParams();
  const getComponentParam = searchParam.get("add-component");
  const getStatusParam = searchParam.get("status");
  const [deleteInventory, setDeleteInventory] = useState(false);
  const [inventoryIdToDelete, setInventoryIdToDelete] = useState<string | null>(
    null,
  );

  const { inventory } = useInventory();
  const [component, setComponent] = useState<InventoryComponent>({
    name: "",
    location: "",
    status: "In Stock",
    current_qty: 1,
    image: "",
  });

  const handleEdit = (component: InventoryComponent) => {
    setComponent(component);
    router.push("?add-component=edit");
  };

  const handledelete = (id: string) => {
    setInventoryIdToDelete(id);
    setDeleteInventory((prev) => !prev);
  };

  useEffect(() => {
    setFilter(
      (getStatusParam?.toString().replaceAll("-", " ") as statusType) || null,
    );
  }, [getStatusParam?.toString()]);

  if (!inventory) {
    return null;
  }

  return (
    <div className="w-full h-full">
      {deleteInventory && inventoryIdToDelete && (
        <DeleteInventory
          componentId={inventoryIdToDelete}
          setDeleteInventory={() => handledelete("")}
        />
      )}
      {getComponentParam === "new" ? (
        <NewComponent
          title="New component"
          data={component}
          action={setComponent}
        />
      ) : (
        getComponentParam === "edit" && (
          <NewComponent
            title="Edit component"
            data={component}
            action={setComponent}
          />
        )
      )}
      <PageHeader
        title="Inventory"
        buttonOneText="New"
        // buttonTwoText="CSV"
        // buttonPropTwo={{ variant: "outline" }}
        buttonPropOne={{
          onClick: () => router.push("?add-component=new"),
          style: { display: "flex", alignItems: "center", gap: "5px" },
        }}
        solidOne={true}
      />
      <div className="border-t-2 mt-5 grid">
        <div className="py-5 flex gap-2 justify-between items-center">
          <Input
            type="text"
            placeholder="search"
            className="max-w-80 focus-visible:ring-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 flex items-center gap-2">
              <span>Filter</span>
              <Filter className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/dashboard/inventory?status=Low-Stock"
                  className="w-full"
                >
                  Low stock
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/inventory?status=In-Stock"
                  className="w-full"
                >
                  In stock
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/inventory?status=Out-of-Stock"
                  className="w-full"
                >
                  Out of stock
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/inventory" className="w-full">
                  All
                </Link>
              </DropdownMenuItem>
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
                  className={`${component.status.toLowerCase() === "in stock" ? "text-green-400" : component.status.toLowerCase() === "low stock" ? "text-yellow-400" : "text-red-400"} flex items-center gap-2 font-medium`}
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
                      <DropdownMenuItem onClick={() => handleEdit(component)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handledelete(component.id!)}
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
            disabled={
              page === totalInventoriesPages || totalInventoriesPages === 0
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
