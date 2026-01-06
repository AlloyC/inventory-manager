"use client";
import Logo from "../../../../public/assets/svgs/Logo";
import Input from "@/components/Input";
import SubmitBtn from "@/components/submitBtn";
import supabase from "@/app/SupabaseCredentials";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("Error in password reset:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-96 shadow-2xl p-5 flex flex-col justify-center rounded-2xl bg-white/40 backdrop-blur-md">
      <div className="self-center pb-7 pt-3">
        <Logo mode="dark" className="w-40" />
      </div>
      <div className="pb-5">
        <h3 className="text-lg text-center font-medium text-blue-800">
          Recover Password
        </h3>
      </div>
      <form className="w-full h-10/12 rounded-2xl flex flex-col gap-7">
        <Input
          value={email}
          setValue={setEmail}
          type="email"
          label="Enter your email"
        />
        <SubmitBtn active={loading} action={handleSubmit} text="Submit" />
      </form>
    </div>
  );
};

export default page;
