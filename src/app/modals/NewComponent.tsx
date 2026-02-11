"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { InventoryComponent } from "../types/type";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import supabase from "../SupabaseCredentials";
import SubmitBtn from "@/components/submitBtn";
import { useInventory } from "../Provider/InventoryContext";
import { toast } from "react-toastify";

const NewComponent = ({
  title,
  data,
  action,
}: {
  title: string;
  data: InventoryComponent;
  action: Dispatch<SetStateAction<InventoryComponent>>;
}) => {
  const [active, setActive] = useState(false);
  const [image, setImage] = useState<{ url: string; file: File }>();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { setRefresh } = useInventory();
  const handleCancel = () => {
    router.push("/dashboard/inventory");
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage({ file, url });
  };

  const uploadNewData = async () => {
    try {
      const generatedId = crypto.randomUUID();
      if (image) {
        const { error } = await supabase.storage
          .from("components")
          .upload(`${generatedId}/${image.file.name}`, image.file, {
            cacheControl: "3600",
          });
        if (error) {
          throw error;
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/components/${generatedId}/${image.file.name}`;

        action((prev) => ({
          ...prev,
          image: imageUrl,
        }));

        const { error: insertError } = await supabase
          .from("components")
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            id: generatedId,
            name: data.name,
            location: data.location,
            current_qty: data.current_qty,
            low_stock_threshold: data.low_stock_threshold,
            image: imageUrl,
            status:
              data.current_qty <= data.low_stock_threshold
                ? "Low Stock"
                : "In Stock",
          });

        if (insertError) {
          throw insertError;
        }
      } else {
        const { error: insertError } = await supabase
          .from("components")
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            id: generatedId,
            name: data.name,
            location: data.location,
            current_qty: data.current_qty,
            low_stock_threshold: data.low_stock_threshold,
            status:
              data.current_qty <= data.low_stock_threshold
                ? "Low Stock"
                : "In Stock",
          });
        if (insertError) {
          throw insertError;
        }
      }
      toast.success("Component created successfully");
      setRefresh((prev) => !prev);
      router.push("/dashboard/inventory");
    } catch (error: any) {
      console.error("Error uploading new data:", error);
      toast.error("Error uploading new component: " + error.message);
    }
  };

  const updateData = async () => {
    try {
      if (image) {
        const { error } = await supabase.storage
          .from("components")
          .upload(`${data.id}/${image.file.name}`, image.file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) {
          throw error;
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/components/${data.id}/${image.file.name}`;

        const { error: updateError } = await supabase
          .from("components")
          .update({
            name: data.name,
            location: data.location,
            current_qty: data.current_qty,
            low_stock_threshold: data.low_stock_threshold,
            status:
              data.current_qty <= data.low_stock_threshold
                ? "Low Stock"
                : "In Stock",
            image: imageUrl,
          })
          .eq("id", data.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        const { error: updateError } = await supabase
          .from("components")
          .update({
            name: data.name,
            location: data.location,
            current_qty: data.current_qty,
            low_stock_threshold: data.low_stock_threshold,
            status:
              data.current_qty <= data.low_stock_threshold
                ? "Low Stock"
                : "In Stock",
          })
          .eq("id", data.id);

        if (updateError) {
          throw updateError;
        }
      }
      toast.success("Component updated successfully");
      setRefresh((prev) => !prev);
      router.push("/dashboard/inventory");
    } catch (error: any) {
      console.error("Error updating data:", error);
      toast.error("Error updating component: " + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.location === "" || !data.location) {
      formRef.current
        ?.querySelector("#location")
        ?.classList.add("border-red-500");
    } else {
      formRef.current
        ?.querySelector("#location")
        ?.classList.remove("border-red-500");
    }

    if (data.name === "" || !data.name) {
      formRef.current?.querySelector("#name")?.classList.add("border-red-500");
    } else {
      formRef.current
        ?.querySelector("#name")
        ?.classList.remove("border-red-500");
    }

    if (data.current_qty < 0) {
      formRef.current
        ?.querySelector("#quantity")
        ?.classList.add("border-red-500");
    } else {
      formRef.current
        ?.querySelector("#quantity")
        ?.classList.remove("border-red-500");
    }

    if (data.low_stock_threshold < 0) {
      formRef.current
        ?.querySelector("#low-qty")
        ?.classList.add("border-red-500");
    } else {
      formRef.current
        ?.querySelector("#low-qty")
        ?.classList.remove("border-red-500");
    }

    if (
      data.name &&
      data.location &&
      data.current_qty >= 0 &&
      data.low_stock_threshold >= 0
    ) {
      (() => setActive(true))();
      if (data.id) {
        await updateData().finally(() => setActive(false));
      } else {
        await uploadNewData().finally(() => setActive(false));
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 bg-black/5">
      <div className="m-auto shadow-2xl border flex gap-2 flex-col items-start bg-white dark:bg-accent rounded-xl p-5 w-full max-w-lg">
        <div className="flex justify-between w-full">
          <h2 className="font-medium text-lg">{title || "New Component"}</h2>
          <Button variant={"ghost"} onClick={handleCancel}>
            <X />
          </Button>
        </div>
        <form ref={formRef} className="flex gap-3 flex-col w-full px-3">
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
              id="low-qty"
              name="low-qty"
              onChange={(e) =>
                action((prev) => ({
                  ...prev,
                  low_stock_threshold: Number(e.target.value),
                }))
              }
              value={data.low_stock_threshold}
            />
          </label>
          <SubmitBtn
            action={handleSubmit}
            active={active}
            text={data.id ? "Update Component" : "Create Component"}
          />
        </form>
      </div>
    </div>
  );
};

export default NewComponent;
