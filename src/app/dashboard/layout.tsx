import React from "react";
import Sidebar from "./Sidebar";
import UserContext from "../Provider/UserContext";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-screen flex h-dvh">
      <div className="w-72">
        <Sidebar />
      </div>
      <div className="w-full border">
        <UserContext>{children}</UserContext>
      </div>
    </div>
  );
};

export default layout;
