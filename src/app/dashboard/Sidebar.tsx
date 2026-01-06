import Link from "next/link";

// Type
type NavbarLink = {
  name: string;
  path: string;
};

const navbarLinks: NavbarLink[] = [
  { name: "dashboard", path: "/dashboard" },
  { name: "inventory", path: "/dashboard/inventory" },
  { name: "projects", path: "/dashboard/projects" },
  { name: "settings", path: "/dashboard/settings" },
];

const Navigations = ({ name, path }: NavbarLink) => {
  return (
    <Link href={path} className="w-10/12">
      <li className="capitalize font-medium text-lg text-blue-700 py-1 rounded px-5">
        {name}
      </li>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <header className="font-semibold text-blue-800 text-2xl italic text-center py-3">
        Inventra
      </header>
      <nav className="w-full">
        <ul className="space-y-4 flex flex-col items-center pt-5">
          {navbarLinks.map((nav, id) => (
            <Navigations name={nav.name} path={nav.path} key={id} />
          ))}
        </ul>
      </nav>
      <button className="absolute bottom-5 border px-5 py-1 font-medium">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
