"use client";
import { NavbarLink } from "@/app/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigations = ({ name, path, Logo }: NavbarLink) => {
  const pathname = usePathname();
  return (
    <Link href={path} className="w-10/12">
      <li
        className={`${
          pathname === path && "bg-gray-600"
        } capitalize font-medium py-2 rounded px-5 flex gap-2 items-center hover:bg-gray-600`}
      >
        <span>{Logo}</span>
        <span>{name}</span>
      </li>
    </Link>
  );
};

export default Navigations;
