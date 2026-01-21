"use client";
import { NavbarLink } from "@/app/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigations = ({ name, path, Logo }: NavbarLink) => {
  const pathname = usePathname();
  return (
    <Link href={path}>
      <span
        className={`${pathname === path && "bg-gray-600/5"} capitalize py-2 rounded w-11/12 mx-auto flex gap-2 items-center hover:bg-gray-600/10 px-5`}
      >
        <span className="scale-90">
          <Logo />
        </span>
        <span className="w-32">{name}</span>
      </span>
    </Link>
  );
};

export default Navigations;
