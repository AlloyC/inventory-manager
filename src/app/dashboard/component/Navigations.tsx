"use client";
import { NavbarLink } from "@/app/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigations = ({ name, path, Logo, status }: NavbarLink) => {
  const pathname = usePathname();
  return (
    <Link href={path} className="w-10/12">
      <li
        className={`${pathname === path && "bg-gray-600"} ${
          !status && "justify-center"
        } capitalize py-2 rounded w-full flex gap-2 items-center hover:bg-gray-600 px-5`}
      >
        <span className="scale-90">{Logo}</span>
        {status && <span className="w-32">{name}</span>}
      </li>
    </Link>
  );
};

export default Navigations;
