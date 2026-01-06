import Image from "next/image";
import { MouseEventHandler } from "react";

const SubmitBtn = ({
  text,
  action,
  active,
}: {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={action}
        className={` flex justify-center items-center focus:outline-none focus:bg-blue-700 hover:bg-blue-700 w-full text-center bg-blue-600 p-2 rounded text-white font-semibold ${
          active ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={active}
      >
        {text}
        <span
          className={active ? "inline-block ml-2 bg-none w-5 h-5" : "hidden"}
        >
          <Image
            src={"/assets/gif/Spinner.gif"}
            alt="submit icon"
            width={40}
            height={40}
            className="object-contain"
          />
        </span>
      </button>
    </div>
  );
};

export default SubmitBtn;
