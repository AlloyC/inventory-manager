"use client";

import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavbarLink } from "../types/type";
import {
  FolderKanban,
  LayoutDashboardIcon,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import Logo from "../../../public/assets/svgs/Logo";
import Navigations from "./component/Navigations";
import { Dispatch, SetStateAction, useState } from "react";

const navbarLinks: NavbarLink[] = [
  { name: "dashboard", path: "/dashboard", Logo: LayoutDashboardIcon },
  { name: "inventory", path: "/dashboard/inventory", Logo: Package },
  { name: "projects", path: "/dashboard/projects", Logo: FolderKanban },
  { name: "settings", path: "/dashboard/settings", Logo: Settings },
];

const Sidebar = ({
  setLogout,
}: {
  setLogout: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentPath, setCurrentPath] = useState("");
  return (
    <AppSidebar className="w-64">
      <SidebarHeader>
        <Logo mode="dark" className="w-32 mx-auto my-4" />
      </SidebarHeader>
      <SidebarContent>
        {navbarLinks.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Navigations
                currentPath={currentPath}
                setCurrentPath={setCurrentPath}
                name={item.name}
                path={item.path}
                Logo={item.Logo}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <button
          onClick={() => setLogout(true)}
          className={`px-5 w-full py-2 text-sm rounded font-medium hover:bg-gray-600/10  flex gap-2 items-center`}
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </SidebarFooter>
    </AppSidebar>
  );
};
// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <>
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={`absolute text-white top-0 p-1 mt-5 rounded bg-gray-700/70 ${
//           isOpen ? "right-1 " : "-right-5"
//         } transition-transform pointer-events-auto duration-150 z-50`}
//       >
//         {isOpen ? (
//           <SidebarClose className="w-5 h-5" />
//         ) : (
//           <SidebarOpen className="w-5 h-5" />
//         )}
//       </button>
//       <div
//         // onMouseEnter={() => setIsOpen(true)}
//         // onMouseLeave={() => setIsOpen(false)}
//         className={`${isOpen ? " bg-gray-700" : " bg-blue-600"} w-2 hover:w-min overflow-clip transition-[width] duration-500 flex pointer-events-auto relative flex-col items-center h-full `}
//       >
//         <header className="font-semibold text-2xl italic text-center py-3 pt-5">
//           {isOpen ? (
//             <Logo mode="light" className="w-32" />
//           ) : (
//             <Image
//               src="/assets/svgs/logoIcon.svg"
//               alt="Logo"
//               width={32}
//               height={32}
//             />
//           )}
//         </header>
//         <nav className="w-full text-white pt-5">
//           <ul className="space-y-3 flex flex-col items-center pt-5">
//             {navbarLinks.map((nav, id) => (
// <Navigations
//   name={nav.name}
//   path={nav.path}
//   Logo={nav.Logo}
//   key={id}
//   status={isOpen}
// />
//             ))}
//           </ul>
//         </nav>
//         <div className="absolute bottom-5 w-full">

//         </div>
//       </div>
//     </>
//   );
// };

export default Sidebar;
