"use client";
import { useUser } from "@/app/Provider/UserContext";

const Welcome = () => {
  const { firstName } = useUser();
  return (
    <div className="text-2xl mt-5 mb-8 font-medium text-gray-800">
      Welcome back {firstName},
    </div>
  );
};

export default Welcome;
