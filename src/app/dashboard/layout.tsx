import React from "react";
import Sidebar from "./Sidebar";
import UserContext from "../Provider/UserContext";
import TopBar from "./TopBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import InventoryContext from "../Provider/InventoryContext";
import ProjectsProvider from "../Provider/ProjectsProvider";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] w-full min-h-dvh ">
        <div className="row-start-1  relative row-end-3">
          <Sidebar />
        </div>
        <div className="w-full">
          <TopBar />
        </div>
        <main className="w-full max-w-7xl mx-auto h-full p-5 md:px-10">
          <UserContext>
            <ProjectsProvider>
              <InventoryContext>{children}</InventoryContext>
            </ProjectsProvider>
          </UserContext>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
