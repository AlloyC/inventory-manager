import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

const DeleteProject = ({
  setDeleteProject,
}: {
  setDeleteProject: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleDelete = async () => {
    // delete project from supabase...
    // Test all checklist from todays activity
  };
  return (
    <div
      onClick={() => setDeleteProject(false)}
      className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-xl min-w-72 max-w-96 min-h-48 border justify-center">
        <h2 className="text-xl font-semibold mb-3">Delete Project</h2>
        <p className="mb-4 text-center">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button variant={"outline"} onClick={() => setDeleteProject(false)}>
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
