import { MouseEventHandler } from "react";

const SubmitBtn = ({ text, action }: { text: string; action: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div>
      <button type="button" onClick={action} className="cursor-pointer focus:outline-none focus:bg-blue-700 hover:bg-blue-700 w-full text-center bg-blue-600 p-2 rounded text-white font-semibold">
        {text}
      </button>
    </div>
  );
};

export default SubmitBtn;
