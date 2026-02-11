"use client";

import Input from "@/components/Input";
import SubmitBtn from "@/components/submitBtn";
import supabase from "@/app/SupabaseCredentials";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //   Submitting to Supabase logic
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        throw error;
      }

      const {
        data: userExist,
        error: userExistError,
        count,
      } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (userExistError) {
        throw userExistError;
      }

      if (count && count > 0) {
        console.log("Login successful:", data);
        router.push("/dashboard");
      } else {
        await supabase.auth.signOut();
        console.log(
          "User does not exist in users table.",
          data.user.id,
          userExist,
        );
      }
      toast.success("Login successful");
    } catch (error: any) {
      console.log("Error logging in:", error);
      toast.error("Error logging in: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form className="w-full h-10/12 rounded-2xl flex flex-col gap-7">
      <Input
        value={username}
        setValue={setUsername}
        type="text"
        label="Username"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        label="Password"
      />
      <div className="self-end italic text-sm cursor-pointer text-[#310076]/90">
        <Link href={"forgot-password"}>forgot password?</Link>
      </div>
      <SubmitBtn active={loading} action={handleSubmit} text="Login" />
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href={"sign-up"}>
          <span className="text-blue-600 cursor-pointer">Sign up</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
