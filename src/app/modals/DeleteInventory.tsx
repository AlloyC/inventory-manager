"use client";
import { Button } from "@/components/ui/button";
import supabase from "../SupabaseCredentials";
import { useRouter } from "next/navigation";
import { useInventory } from "../Provider/InventoryContext";

const DeleteInventory = ({
  setDeleteInventory,
  componentId,
}: {
  setDeleteInventory: () => void;
  componentId: string;
}) => {
  const { setRefresh } = useInventory();
  const handleDelete = async () => {
    try {
      console.log("Attempting to delete inventory with id:", componentId);
      const { data, error } = await supabase
        .from("components")
        .update({
          deleted_at: new Date().toISOString(),
        })
        .eq("id", componentId);
      if (error) throw error;
      console.log("Deleted inventory with id:", data);
      setRefresh(true);
    } catch (error) {
      console.log("Error deleting inventory:", error);
    }
    setDeleteInventory();
    // delete inventory from supabase...
    // Test all checklist from todays activity
    // Key is still being referenced
  };

  return (
    <div className="fixed inset-0 bg-black/10 z-30 flex items-center justify-center">
      <div
        onClick={() => setDeleteInventory()}
        className="absolute inset-0 z-40"
      />
      <div className="flex flex-col items-center bg-white rounded-2xl p-5 relative z-50 shadow-xl min-w-72 max-w-96 min-h-48 border justify-center">
        <h2 className="text-xl font-semibold mb-3">Delete Inventory</h2>
        <p className="mb-4 text-center">
          Are you sure you want to delete this inventory? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button variant={"outline"} onClick={() => setDeleteInventory()}>
            Cancel
          </Button>
          <Button className="bg-red-500 text-white" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventory;
