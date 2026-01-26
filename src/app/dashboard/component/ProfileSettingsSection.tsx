import Image from "next/image";
import StickyHeader from "./StickyHeader";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProfileSettingsSection = () => {
  return (
    <div id="account" className="">
      <StickyHeader title="Profile Settings" />
      <form action="">
        <div>
          {false ? (
            <Image src={""} alt="" />
          ) : (
            <UserCircle className="w-20 h-20 text-slate-400" />
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button type="button">Change Profile Picture</Button>
            <Button type="button">Remove</Button>
            <span className="col-span-2">we support JPG, PNG, GIF</span>
          </div>
        </div>
        <label htmlFor="Username">Username</label>
        <Input id="Username" />
        <h3>Account Security</h3>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" disabled />
        </div>
        <div>
          <label htmlFor="current-password">Current Password</label>
          <input type="password" id="current-password" />
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" />
          <Button type="button">Change Password</Button>
        </div>
        <div>
          <div>
            <h4>Delete my account</h4>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <Button type="button" variant="destructive">
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsSection;
