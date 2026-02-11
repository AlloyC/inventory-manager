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
import { useEffect, useRef, useState } from "react";
import { getSession, useUser } from "@/app/Provider/UserContext";
import supabase from "@/app/SupabaseCredentials";
import { toast } from "react-toastify";

const ProfileSettingsSection = () => {
  const { setDeleteAccount } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null,
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {} = useUser();

  const handleClick = async () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTimeout(
      () => uplaodImage(file).catch((error) => {
      toast.error("Error updating profile image"); console.log(error)}),
      2000,
    );
    setPreview({ file, url: URL.createObjectURL(file) });
  };

  const uplaodImage = async (file: File) => {
    const session = await getSession();
    if (!session) return;
    const update = await supabase.storage
      .from("user_profile")
      .upload(`${session.user.id}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    // Not done with edit
    update.data && console.log("File uploaded successfully:", update.data);
    update.error && console.log("Error uploading file:", update.error);
    if (update.error) throw update.error;

    const { data, error } = await supabase
      .from("users")
      .update({
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user_profile/${session.user.id}/${file.name}`,
      })
      .eq("user_id", session.user.id);
    if (error) {
      throw error
    };
    toast.success("Image uploaded successfully");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange = async () => {
    try {
      if (password.length < 6) {
        console.log("Password must be at least 6 characters");
        return;
      }
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      } else {
        // console.log("Password updated");
        toast.success("Password updated successfully");
      }
    } catch (error: any) {
      console.log("Error updating password:", error);
      toast.error("Error updating password: " + error.message);
    }
  };

  const handleRemoveImage = async () => {
    setPreview(null);
    // remove from input is still undone...
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const session = await getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("users")
      .update({
        avatar_url: null,
      })
      .eq("user_id", session.user.id);
    if (error) throw error;
    console.log("image remove successfully");
    toast.success("Image removed successfully");
  };

  const handleSaveName = async () => {
    try {
      const session = await getSession();
      if (!session) return;
      const { error } = await supabase
        .from("users")
        .update({
          username: username,
        })
        .eq("user_id", session.user.id);
      if (error) throw error;
      console.log("Username updated successfully");
      toast.success("Username updated successfully");
    } catch (error: any) {
      console.log("Error updating username:", error);
      toast.error("Error updating username: " + error.message);
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: username,
        },
      });
      if (error) throw error;
      console.log("User metadata updated successfully");
    } catch (error: any) {
      console.log("Error updating user metadata:", error);
      toast.error("Error updating user metadata: " + error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) return;
      const { data, error } = await supabase
        .from("users")
        .select("avatar_url")
        .eq("user_id", session.user.id)
        .single();
      if (error) {
        console.log(error);
        return;
      }
      data?.avatar_url &&
        setPreview(() => ({ file: {} as File, url: data.avatar_url }));
      setEmail(session.user.email || "");
      setUsername(session.user.user_metadata.username || "");
    })();
  }, []);

  return (
    <div id="account" className="">
      <StickyHeader title="Profile Settings" />
      <form action="" className="p-5">
        <div className="flex  items-center gap-3 mb-5">
          {preview ? (
            <div className="w-16 h-16 rounded-full border">
              <Image
                src={preview.url}
                alt="Profile Preview"
                width={50}
                height={50}
                className="rounded-full object-center w-full h-full"
              />
            </div>
          ) : (
            <UserCircle className="w-20 h-20 text-slate-400" />
          )}
          <div className="grid grid-cols-2 gap-2 ">
            <Input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
            <Button type="button" onClick={handleClick}>
              Change
            </Button>
            <Button
              type="button"
              variant={"outline"}
              className=""
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
            <span className="col-span-2 text-sm">We support JPG, PNG, GIF</span>
          </div>
        </div>
        <label htmlFor="Username">Username</label>
        <div className="flex items-center gap-3 mb-5">
          <Input
            id="Username"
            onChange={handleUsernameChange}
            value={username}
            className="flex-1 max-w-96"
          />
          <Button type="button" onClick={handleSaveName}>
            Save
          </Button>
        </div>
        <h3 className="border-b dark:bg-transparent bg-white p-2 text-lg font-medium">
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
            value={email}
            className="-z-30 max-w-96 cursor-not-allowed"
          />
        </div>
        <div className="flex gap-2 flex-col max-w-96">
          <label htmlFor="new-password" className="font-medium mt-3">
            New Password
          </label>
          <Input
            type="password"
            onChange={handlePassword}
            value={password}
            id="new-password"
          />
          <Button
            type="button"
            onClick={handlePasswordChange}
            className="w-fit mt-5"
          >
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
