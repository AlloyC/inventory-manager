import { Bell, User, User2, UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="py-3 shadow flex items-center justify-end gap-3 pr-10 bg-white">
      <Link href={"/dashboard/notifications"}>
        <Bell className="w-5 h-5 text-gray-600" />
      </Link>
      <Link href={"/dashboard/settings#profile"}>
        <UserCircle className="rounded-full w-10 h-10 text-gray-400" />
      </Link>
    </div>
  );
};

export default TopBar;
