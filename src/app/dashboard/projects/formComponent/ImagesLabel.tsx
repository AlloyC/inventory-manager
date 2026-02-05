"use client";

import supabase from "@/app/SupabaseCredentials";
import { LabelsProps } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Function to rename image URLs from Supabase storage
export const rename = async (image: string, renamedUrls: string[]) => {
  if (
    !image &&
    (!image.includes("https") ||
      !image.includes("http") ||
      image.includes("blob:"))
  ) {
    renamedUrls.push(image);
    return;
  }

  const { data, error } = await supabase.storage
    .from("project_images")
    .createSignedUrl(image, 3600);

  if (error) {
    throw error;
  }

  renamedUrls.push(data.signedUrl!);
  return;
};

const ImagesLabel = ({
  projectData,
  setProjectData,
  setImages,
}: LabelsProps & {
  setImages: React.Dispatch<
    React.SetStateAction<{ file: File; url: string }[]>
  >;
}) => {
  const [editedUrls, setEditedUrls] = useState<string[]>([]);
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Image change event:", editedUrls);
    const files = e.target.files;
    if (files) {
      // Create object URLs for each selected file and update state
      const imageUrls = Array.from(files).map((file) => {
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { file, url }]);
        return url;
      });

      // Update projectData images to include new image URLs
      setProjectData((prev) => ({
        ...prev!,
        images: [...(prev?.images || []), ...imageUrls.map((url) => ({ url }))],
      }));
      setEditedUrls((prev) => [...prev, ...imageUrls]);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        projectData?.images &&
        projectData.images.length > 0 &&
        editedUrls.length === 0
      ) {
        const renamedUrls = async () => {
          const renamedUrlArray: string[] = [];
          for (const img of projectData.images!) {
            await rename(img.url, renamedUrlArray).catch((err) =>
              console.error(err),
            );
          }
          return renamedUrlArray;
        };
        const urls = await renamedUrls();
        console.log("Renamed URLs:", urls);
        setEditedUrls(urls);
      }
    })();
    return () => {
      // Revoke object URLs to avoid memory leaks
      editedUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  return (
    <div>
      <label htmlFor="images">
        <span className="font-medium mb-2 block">Images</span>
        <Input
          type="file"
          id="images"
          multiple
          accept="image/*"
          maxLength={5}
          onChange={handleImagesChange}
          name="images"
        />
      </label>
      {editedUrls && editedUrls.length > 0 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {editedUrls.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`Project Image ${index + 1}`}
                width={100}
                height={100}
                className="rounded-md"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1 right-1 rounded-full bg-white p-1"
                onClick={() => {
                  const index = [...editedUrls].findIndex(
                    (img) => img === image,
                  );
                  // Remove image from images state
                  setImages((prev) => {
                    const index = prev.findIndex((img) => img.url === image);
                    if (index !== -1) {
                      const newImages = [...prev];
                      newImages.splice(index, 1);
                      return newImages;
                    }
                    return prev;
                  });
                  // Remove image from images state
                  setEditedUrls((prev) => {
                    if (index !== -1) {
                      const newImages = [...prev];
                      newImages.splice(index, 1);
                      return newImages;
                    }
                    return prev;
                  });
                  // Remove image from projectData images
                  setProjectData((prev) => {
                    if (prev && prev.images) {
                      const updatedImages = prev.images.filter(
                        (_, imgIndex) => imgIndex !== index,
                      );
                      return { ...prev, images: updatedImages };
                    }
                    return prev;
                  });
                }}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesLabel;
