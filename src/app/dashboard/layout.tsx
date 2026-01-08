import React from "react";
import Sidebar from "./Sidebar";
import UserContext from "../Provider/UserContext";
import TopBar from "./TopBar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-screen layout-grid-template h-dvh bg-gray-100">
      <div className="w-64 sidebar">
        <Sidebar />
      </div>
      <div className="topbar w-full">
        <TopBar />
      </div>
      <main className="w-full main">
        <UserContext>{children}</UserContext>
      </main>
    </div>
  );
};

export default layout;
