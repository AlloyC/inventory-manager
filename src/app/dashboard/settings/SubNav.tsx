"use client";
import { Bell, Palette, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navigations from "../component/Navigations";

const SubNav = () => {
  const [currentPath, setCurrentPath] = useState("");
  return (
    <div className="hidden lg:flex flex-col gap-2 justify-center items-center sticky top-0 pt-5 h-fit w-fit ">
      {/* <CustomLink link="account" text="Account" Icon={UserCircle} />
      <CustomLink link="theme" text="Theme" Icon={Palette} />
      <CustomLink link="notification" text="Notification" Icon={Bell} /> */}
      <Navigations
        Logo={UserCircle}
        name="account"
        path="/dashboard/settings#account"
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      <Navigations
        Logo={Palette}
        name="theme"
        path="/dashboard/settings#theme"
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
      <Navigations
        Logo={Bell}
        name="notification"
        path="/dashboard/settings#notification"
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
      />
    </div>
  );
};

const CustomLink = ({
  link,
  text,
  Icon,
}: {
  link: string;
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <Link
      href={`#${link}`}
      className="hover:bg-slate-50 px-5 py-2 flex items-center gap-2 rounded active:bg-slate-100 w-36 text-center"
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
    </Link>
  );
};

export default SubNav;
