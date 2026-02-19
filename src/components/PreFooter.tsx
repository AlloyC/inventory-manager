"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const PreFooter = () => {
  const router = useRouter();
  return (
    <div className="bg-blue-600 text-white">
      <div className="max-w-6xl  mx-auto py-12 px-4 flex flex-col items-center border-b">
        <h2 className="md:text-5xl text-3xl font-semibold text-center mb-3">
          Start building with clarity
        </h2>
        <p className="text-center">
          No credit card needed. No setup fees. Just honest inventory
          management.
        </p>
        <Button
          onClick={() => router.push("/auth/sign-up")}
          className="w-fit mt-6 bg-white text-black"
        >
          Start free
        </Button>
      </div>
    </div>
  );
};

export default PreFooter;
