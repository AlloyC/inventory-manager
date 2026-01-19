"use client";

import SubmitBtn from "@/components/submitBtn";
import Input from "../../../components/Input";
import Link from "next/link";
import supabase from "@/app/SupabaseCredentials";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpUser = async () => {
    // Basic validation
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    setLoading(true);
    // Sign up user with Supabase
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirmation`,
          data: {
            username: username,
          },
        },
      });
      if (error) {
        throw error;
      }
      //   Route user to confirmation page
      data.user && router.push("/auth/confirmation");
    } catch (error) {
      console.log("Error signing up:", error);
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
      <Input value={email} setValue={setEmail} type="email" label="Email" />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        label="Password"
      />
      <Input
        value={confirmPassword}
        setValue={setConfirmPassword}
        type="password"
        label="Confirm Password"
      />
      <SubmitBtn active={loading} action={signUpUser} text="Sign Up" />
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"login"}>
          <span className="text-blue-600 cursor-pointer">log in</span>
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
