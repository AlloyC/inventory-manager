"use client";
import SubmitBtn from "@/app/components/submitBtn";
import Input from "../../components/Input";
import Link from "next/link";
import Logo from "../../../../public/assets/svgs/Logo";
import supabase from "@/app/SupabaseCredentials";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function signUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswaord] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const signUpUser = async () => {
    // Basic validation
    if (password !== confrimPassword) {
      console.log("Passwords do not match");
      return;
    }
    // Sign up user with Supabase
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/confirmation` },
      });
      if (error) {
        throw error;
      }
      console.log("User signed up successfully:", data);
      data.user && router.push("/auth/confirmation");
    } catch (error) {
      console.log("Error signing up:", error);
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log("Current user after sign up:", user);
    });
  };

  return (
    <div className="w-96 shadow-2xl p-5 flex flex-col justify-center rounded-2xl bg-white/40 backdrop-blur-md">
      <div className="self-center pb-7 pt-3">
        <Logo mode="dark" className="w-40" />
      </div>
      <div className="pb-5">
        <h3 className="text-lg text-center font-medium text-blue-800">
          Create your account
        </h3>
        <p className=" text-center italic text-blue-800">
          Start managing your inventory today.
        </p>
      </div>
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
          setValue={setPasswaord}
          type="password"
          label="Password"
        />
        <Input
          value={confrimPassword}
          setValue={setConfirmPassword}
          type="password"
          label="Confirm Password"
        />
        <SubmitBtn action={signUpUser} text="Sign Up" />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href={"login"}>
            <span className="text-blue-600 cursor-pointer">log in</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default signUp;
