"use client";
import Logo from "../../../public/assets/svgs/Logo";
import {
  ChevronLeft,
  FolderKanban,
  LayoutDashboardIcon,
  LogOut,
  Package,
  Settings,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { NavbarLink } from "../types/type";
import Navigations from "./component/Navigations";
import { useState } from "react";
import Image from "next/image";

const navbarLinks: NavbarLink[] = [
  { name: "dashboard", path: "/dashboard", Logo: <LayoutDashboardIcon /> },
  { name: "inventory", path: "/dashboard/inventory", Logo: <Package /> },
  { name: "projects", path: "/dashboard/projects", Logo: <FolderKanban /> },
  { name: "settings", path: "/dashboard/settings", Logo: <Settings /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`absolute text-white top-0 p-1 mt-5 rounded bg-gray-700/70 ${
          isOpen ? "right-1 " : "-right-5"
        } transition-transform pointer-events-auto duration-150 z-50`}
      >
        {isOpen ? (
          <SidebarClose className="w-5 h-5" />
        ) : (
          <SidebarOpen className="w-5 h-5" />
        )}
      </button>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="w-min transition-all duration-500 flex pointer-events-auto relative flex-col items-center h-full bg-gray-700"
      >
        <header className="font-semibold text-2xl italic text-center py-3 pt-5">
          {isOpen ? (
            <Logo mode="light" className="w-32" />
          ) : (
            <Image
              src="/assets/svgs/logoIcon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </header>
        <nav className="w-full text-white pt-5">
          <ul className="space-y-3 flex flex-col items-center pt-5">
            {navbarLinks.map((nav, id) => (
              <Navigations
                name={nav.name}
                path={nav.path}
                Logo={nav.Logo}
                key={id}
                status={isOpen}
              />
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-5 w-full">
          <button
            className={`${
              !isOpen ? "justify-center mx-auto px-4 w-max" : "mx-5 px-5 w-full"
            } text-white  py-2 rounded font-medium hover:bg-gray-600  flex gap-2 items-center`}
          >
            <span>
              <LogOut />
            </span>
            <span className={`${isOpen ? "visible" : "invisible"}`}>
              Log Out
            </span>
            {/* {isOpen && <span className="">Log Out</span>} */}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
