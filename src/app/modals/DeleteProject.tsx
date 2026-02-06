"use client";
import { Button } from "@/components/ui/button";
import supabase from "../SupabaseCredentials";
import { useRouter } from "next/navigation";
import { useProjects } from "../Provider/ProjectsProvider";

const DeleteProject = ({
  setDeleteProject,
  projectId,
}: {
  setDeleteProject: () => void;
  projectId: string;
}) => {
  const { setRefresh } = useProjects();
  const handleDelete = async () => {
    try {
      // Get related project images urls
      const { data, error: imageError } = await supabase
        .from("images")
        .select("*")
        .eq("project_id", projectId);
      if (imageError) throw imageError;
      const images = data || [];

      // cascade delete project
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);
      if (error) throw error;

      // delete related images from storage
      if (images.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("project_images")
          .remove(images.map((img) => img.url));
        if (storageError) throw storageError;
      }
      setRefresh(true);
      setDeleteProject();
    } catch (error) {
      console.log("Error deleting project:", error);
    }
    // delete project from supabase...
    // Test all checklist from todays activity
  };
  return (
    <div className="fixed inset-0 bg-black/10 z-30 flex items-center justify-center">
      <div
        onClick={() => setDeleteProject()}
        className="absolute inset-0 z-40"
      />
      <div className="flex flex-col items-center relative z-50 bg-white rounded-2xl p-5 shadow-xl min-w-72 max-w-96 min-h-48 border justify-center">
        <h2 className="text-xl font-semibold mb-3">Delete Project</h2>
        <p className="mb-4 text-center">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button variant={"outline"} onClick={() => setDeleteProject()}>
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

export default DeleteProject;
