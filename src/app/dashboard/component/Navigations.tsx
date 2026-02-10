"use client";
import { NavbarLink } from "@/app/types/type";
import Link from "next/link";
import { useEffect } from "react";

const Navigations = ({
  name,
  path,
  Logo,
  currentPath,
  setCurrentPath,
  onClick,
}: NavbarLink & { onClick?: () => void }) => {
  const handleClick = () => {
    // Immediately update the state when clicked
    setCurrentPath && setCurrentPath(path);
    onClick && onClick();
  };

  useEffect(() => {
    // Update currentPath based on the URL hash
    if (window.location.hash === `#${name}`) {
      setCurrentPath && setCurrentPath(path);
    }
  }, [name, path]);

  return (
    <Link href={path} onClick={handleClick}>
      <span
        className={`${currentPath === path ? "bg-gray-600/5" : ""} capitalize py-2 rounded w-11/12 mx-auto flex gap-2 items-center hover:bg-gray-600/10 px-5`}
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
