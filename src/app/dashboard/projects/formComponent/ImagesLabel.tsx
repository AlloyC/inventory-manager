"use client";

import { LabelsProps } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";

const ImagesLabel = ({ projectData, setProjectData, setImages }: (LabelsProps & { setImages: React.Dispatch<React.SetStateAction<{ file: File; url: string }[]>> })) => {
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };
  return (
    <div>
      <label htmlFor="images">
        <span className="font-medium mb-2 block">Images</span>
        <Input
          type="file"
          id="images"
          multiple
          accept="image/*"
          maxLength={ 5 }
          onChange={handleImagesChange}
          name="images"
        />
      </label>
      {projectData?.images && projectData.images.length > 0 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {projectData.images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image.url}
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
                  // Remove image from images state
                  setImages((prev) => {
                    const updatedImages = prev.findIndex(
                      (img) => img.url === image.url,
                    );
                    if (updatedImages !== -1) {
                      const newImages = [...prev];
                      newImages.splice(updatedImages, 1);
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
