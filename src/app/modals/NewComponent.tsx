"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { InventoryComponent } from "../types/type";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NewComponent = ({
  title,
  data,
  action,
}: {
  title: string;
  data: InventoryComponent;
  action: Dispatch<SetStateAction<InventoryComponent>>;
}) => {
  const [image, setImage] = useState<{ url: string; file: File }>();
  const router = useRouter();
  const handleCancel = () => {
    router.push("/dashboard/inventory");
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage({ file, url });
  };

  // Handle low stock amount. Add column to supabase

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 bg-black/5">
      <div className="m-auto shadow-2xl border flex gap-2 flex-col items-start bg-white dark:bg-accent rounded-xl p-5 w-full max-w-lg">
        <div className="flex justify-between w-full">
          <h2 className="font-medium text-lg">{title || "New Component"}</h2>
          <Button variant={"ghost"} onClick={handleCancel}>
            <X />
          </Button>
        </div>
        <form className="flex gap-3 flex-col w-full px-3" action="">
          <label htmlFor="image" className="flex flex-col gap-2">
            <span className="font-medium">Image</span>
            <div className="flex gap-2">
              <Input
                type="file"
                id="image"
                accept="image/*"
                maxLength={1}
                name="image"
                onChange={handleImageChange}
              />
              {image?.url && (
                <Image
                  src={image.url}
                  width={30}
                  height={20}
                  className="rounded w-10"
                  alt="component"
                />
              )}
            </div>
          </label>
          <label htmlFor="name" className="flex flex-col gap-2">
            <span className="font-medium">Name</span>
            <Input
              id="name"
              name="Component name"
              onChange={(e) =>
                action((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={data.name}
            />
          </label>
          <label htmlFor="location" className="flex flex-col gap-2">
            <span className="font-medium">Location</span>
            <Input
              id="location"
              name="location"
              onChange={(e) =>
                action((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              value={data.location}
            />
          </label>
          <label htmlFor="quantity" className="flex flex-col gap-2">
            <span className="font-medium">Quantity</span>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              onChange={(e) =>
                action((prev) => ({
                  ...prev,
                  current_qty: Number(e.target.value),
                }))
              }
              value={data.current_qty}
            />
          </label>
          <label htmlFor="low-qty" className="flex flex-col gap-2">
            <span className="font-medium">Set low stock amount</span>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              // Handle low stock amount. Add column to supabase
              // onChange={(e) =>
              //   action((prev) => ({
              //     ...prev,
              //     current_qty: Number(e.target.value),
              //   }))
              // }
              // value={data.current_qty}
            />
          </label>
          <Button
            className="bg-blue-600 mt-4 mb-2 dark:text-slate-50 dark:hover:bg-blue-700"
            type="submit"
          >
            Create Component
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewComponent;
