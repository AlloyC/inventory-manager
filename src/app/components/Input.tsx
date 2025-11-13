"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Input = ({
  type,
  label,
  value,
  setValue,
}: {
  type: string;
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const [active, setActive] = useState(false);
  // const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [value]);

  return (
    <div className="relative">
      <label
        className={`absolute  transition-all ${
          active
            ? "-top-3 left-0 text-sm font-semibold px-1 text-blue-800"
            : "text-gray-600 left-2 top-2"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        onChange={(e) => setValue((prev) => (prev = e.target.value))}
        className=" w-full p-2 border-b border-gray-300 outline-none focus:border-blue-600 transition-all"
      />
    </div>
  );
};

export default Input;
