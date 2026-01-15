import React from "react";
import Sidebar from "./Sidebar";
import UserContext from "../Provider/UserContext";
import TopBar from "./TopBar";
import GridOverlay from "@/components/gridOverlay";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    // <div className="w-screen max-w-7xl overflow-x-hidden layout-grid-template h-dvh bg-gray-100 relative">
    //   <div className="pr-5 sidebar overflow-y-scroll scrollbar-hidden fixed h-full pointer-events-none">
    //     <Sidebar />
    //   </div>
    //   <div className=" topbar w-full">
    //     <TopBar />
    //   </div>
    //   <GridOverlay />
    //   <main className="relative w-full h-full py-5 main">
    //     <UserContext>{children}</UserContext>
    //   </main>
    // </div>
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] w-full min-h-dvh overflow-x-hidden">
      <div className="row-start-1 relative row-end-3 border">
        <Sidebar />
      </div>
      <div className="">
        <TopBar />
      </div>
      <main className="w-full h-full py-5">
        <UserContext>{children}</UserContext>
      </main>
    </div>
  );
};

export default layout;
