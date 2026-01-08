import Logo from "../../../public/assets/svgs/Logo";
import {
  FolderKanban,
  LayoutDashboardIcon,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { NavbarLink } from "../types/type";
import Navigations from "./component/Navigations";

const navbarLinks: NavbarLink[] = [
  { name: "dashboard", path: "/dashboard", Logo: <LayoutDashboardIcon /> },
  { name: "inventory", path: "/dashboard/inventory", Logo: <Package /> },
  { name: "projects", path: "/dashboard/projects", Logo: <FolderKanban /> },
  { name: "settings", path: "/dashboard/settings", Logo: <Settings /> },
];

const Sidebar = () => {
  return (
    <div className="flex relative flex-col items-center h-full bg-gray-700">
      <header className="font-semibold text-2xl italic text-center py-3 pt-5">
        <Logo mode="light" className="w-36" />
      </header>
      <nav className="w-full text-white pt-5">
        <ul className="space-y-4 flex flex-col items-center pt-5">
          {navbarLinks.map((nav, id) => (
            <Navigations
              name={nav.name}
              path={nav.path}
              Logo={nav.Logo}
              key={id}
            />
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-5 w-full px-5">
        <button className="text-white px-5 py-2 rounded font-medium hover:bg-gray-600 w-full flex gap-2 items-center">
          <span>
            <LogOut />
          </span>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
