"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, User2, UserCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "../Provider/UserContext";
import Image from "next/image";
import { useEffect } from "react";

const TopBar = () => {
  const { avatar_url, email } = useUser();
  useEffect(() => {
    console.log("User data in TopBar:", avatar_url, email);
  }, [avatar_url, email]);
  return (
    <div className="py-3 shadow flex items-center justify-between gap-3 pr-10 bg-white dark:bg-sidebar-accent">
      <SidebarTrigger />
      <div className="flex items-center justify-end">
        {/* <Link href={"/dashboard/notifications"}>
          <Bell className="w-5 h-5 text-gray-600" />
        </Link> */}
        <Link href={"/dashboard/settings#profile"}>
          {avatar_url ? (
            <div className="w-10 h-10 rounded-full border">
              <Image
                src={avatar_url}
                alt="Profile Preview"
                width={20}
                height={20}
                className="rounded-full object-center w-full h-full"
              />
            </div>
          ) : (
            <UserCircle className="rounded-full w-10 h-10 text-gray-400" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
