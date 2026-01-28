import { Button } from "@/components/ui/button";

const LogOut = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Log Out</h2>
      <p className="mb-4">Are you sure you want to log out?</p>
      <div>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-600"
        >
          Cancel
        </Button>
        <Button className="bg-red-500 text-white">Log Out</Button>
      </div>
    </div>
  );
};

export default LogOut;
