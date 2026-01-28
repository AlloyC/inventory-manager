"use client";
import { useInventory } from "@/app/Provider/InventoryContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const SummaryComponentsSection = () => {
  const router = useRouter();
  const { inventory } = useInventory();
  if (!inventory) {
    return null;
  }
  return (
    <div className="col-start-1 col-end-13 lg:col-end-5 border rounded-xl">
      <div className="flex gap-1 items-center p-3 border-b">
        <h3 className="font-medium text-lg">Components</h3>
        <Button
          onClick={() => router.push("/dashboard/inventory")}
          variant="link"
          className="ml-auto italic hover:text-blue-500 p-0"
        >
          View All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Current Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.slice(0, 5).map((component) => (
            <TableRow key={component.id}>
              <TableCell>{component.name}</TableCell>
              <TableCell>{component.location}</TableCell>
              <TableCell>{component.current_qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryComponentsSection;
