import { Button } from "@/components/ui/button";

const DeleteAccount = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Delete Account</h2>
      <p className="mb-4">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <div>
        <Button variant={"outline"}>Cancel</Button>
        <Button className="bg-red-500 text-white">Delete Account</Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
