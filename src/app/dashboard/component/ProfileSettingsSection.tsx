"use client";

import Image from "next/image";
import StickyHeader from "./StickyHeader";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { useAuth } from "@/app/Provider/AuthProvider";

const ProfileSettingsSection = () => {
  const { setDeleteAccount } = useAuth();
  return (
    <div id="account" className="">
      <StickyHeader title="Profile Settings" />
      <form action="" className="p-5">
        <div className="flex  items-start gap-3 mb-5">
          {false ? (
            <Image src={""} alt="" />
          ) : (
            <UserCircle className="w-20 h-20 text-slate-400" />
          )}
          <div className="grid grid-cols-2 gap-2 ">
            <Button type="button">Change</Button>
            <Button
              type="button"
              className="bg-transparent text-black border border-black hover:bg-transparent "
            >
              Remove
            </Button>
            <span className="col-span-2 text-sm">We support JPG, PNG, GIF</span>
          </div>
        </div>
        <label htmlFor="Username">Username</label>
        <div className="flex items-center gap-3 mb-5">
          <Input id="Username" className="flex-1 max-w-96" />
          <Button type="button">Save</Button>
        </div>
        <h3 className="border-b bg-white p-2 text-lg font-medium">
          Account Security
        </h3>
        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <Input
            type="email"
            id="email"
            disabled
            value={"someone@gmail.com"}
            className="-z-30 max-w-96 cursor-not-allowed"
          />
        </div>
        <div className="flex gap-2 flex-col max-w-96">
          <label htmlFor="current-password" className="font-medium mt-3">
            Current Password
          </label>
          <Input type="password" id="current-password" />
          <label htmlFor="new-password" className="font-medium mt-3">
            New Password
          </label>
          <Input type="password" id="new-password" />
          <Button type="button" className="w-fit mt-5">
            Change Password
          </Button>
        </div>
        <div className="border-t mt-5 py-4">
          <Field
            orientation="horizontal"
            className="text-red-600 hidden md:flex"
          >
            <FieldContent>
              <FieldLabel htmlFor="switch-notification" className="text-base">
                Delete my account
              </FieldLabel>
              <FieldDescription>
                Once you delete your account, there is no going back. Please be
                certain.
              </FieldDescription>
            </FieldContent>
            <Button
              type="button"
              onClick={() => setDeleteAccount(true)}
              variant="destructive"
            >
              Delete Account
            </Button>
          </Field>
          <Field orientation="vertical" className="text-red-600 md:hidden">
            <FieldContent>
              <FieldLabel htmlFor="switch-notification" className="text-base">
                Delete my account
              </FieldLabel>
              <FieldDescription>
                Once you delete your account, there is no going back. Please be
                certain.
              </FieldDescription>
            </FieldContent>
            <Button
              type="button"
              onClick={() => setDeleteAccount(true)}
              variant="destructive"
            >
              Delete Account
            </Button>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsSection;
