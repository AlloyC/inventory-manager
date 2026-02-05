"use client";
import { useState } from "react";
import SubNav from "./SubNav";
import DeleteAccount from "@/app/modals/DeleteAccount";
import { useAuth } from "@/app/Provider/AuthProvider";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { deleteAccount, setDeleteAccount } = useAuth();
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-full -ml-4 md:-ml-10 -my-4">
      {deleteAccount && <DeleteAccount setDeleteAccount={setDeleteAccount} />}
      <div className=" h-full border-r">
        <SubNav />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
