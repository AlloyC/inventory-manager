"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserContext, { getSession } from "../Provider/UserContext";
import TopBar from "./TopBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import InventoryContext from "../Provider/InventoryContext";
import ProjectsProvider from "../Provider/ProjectsProvider";
import NewComponent from "../modals/NewComponent";
import LogOut from "../modals/LogOut";
import AuthProvider from "../Provider/AuthProvider";
import { useRouter } from "next/navigation";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [logout, setLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!(await getSession())) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SidebarProvider>
      {logout && <LogOut setLogout={setLogout} />}
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] w-full min-h-dvh ">
        <div className="row-start-1  relative row-end-3">
          <Sidebar setLogout={setLogout} />
        </div>
        <div className="w-full">
          <TopBar />
        </div>
        <main className="w-full max-w-7xl mx-auto h-full p-5 md:px-10">
          <UserContext>
            <ProjectsProvider>
              <InventoryContext>
                <AuthProvider>{children}</AuthProvider>
              </InventoryContext>
            </ProjectsProvider>
          </UserContext>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
