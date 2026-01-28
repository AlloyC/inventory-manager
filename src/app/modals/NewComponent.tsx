import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const NewComponent = () => {
  return (
    <div>
      <Button>
        <X />
      </Button>
      <h2>New Component</h2>
      <form action="">
        <label htmlFor="image">Image</label>
        <Input type="file" id="image" name="image" />
        <label htmlFor="name">Name</label>
        <Input id="name" name="Component name" />
        <label htmlFor="location">Location</label>
        <Input id="location" name="location" />
        <label htmlFor="status">Status</label>
        <Input id="status" name="status" />
        <label htmlFor="quantity">Quantity</label>
        <Input type="number" id="quantity" name="quantity" />
        <Button>Create Component</Button>
      </form>
    </div>
  );
};

export default NewComponent;
