import { Plus } from "lucide-react";

const Button = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={`px-2 py-1 rounded border flex items-center gap-1 ${className}`}
    >
      <Plus className="w-4 h-4" />
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
