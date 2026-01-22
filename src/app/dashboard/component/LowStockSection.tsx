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
import Image from "next/image";

const LowStockSection = () => {
  const { lowStock } = useInventory();
  return (
    <div className="col-start-1 col-end-13 row-start-3 md:row-start-2 lg:col-start-5 md:col-end-8 border rounded-xl flex flex-col">
      <div className="flex gap-1 items-center p-3 border-b">
        <h3 className="font-medium text-lg">Low Stock</h3>
        {lowStock && (
          <Button
            variant="link"
            className="ml-auto italic hover:text-blue-500 p-0"
          >
            View All
          </Button>
        )}
      </div>
      {lowStock ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component name</TableHead>
              <TableHead>Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStock.slice(0, 5).map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.current_qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-center">No low stock items.</span>
        </div>
      )}
    </div>
  );
};

export default LowStockSection;
