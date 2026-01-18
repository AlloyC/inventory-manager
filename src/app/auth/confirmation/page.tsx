"use client";
import { useEffect, useState } from "react";
import Logo from "../../../../public/assets/svgs/Logo";
import supabase from "@/app/SupabaseCredentials";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const page = () => {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying confirmation...");

  useEffect(() => {
    (async () => {
      // Supabase usually returns tokens in the URL fragment (#access_token=...&refresh_token=...)
      const fragment = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.search.slice(1);
      const params = new URLSearchParams(fragment);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) {
          console.error("Failed to set session:", error);
          setStatus("Failed to sign in after confirmation.");
          return;
        }
        setStatus("Email confirmed — signing you in...");
        // navigate to your app after session is set
        // router.push("/dashboard");
      } else {
        setStatus(
          "A confirmation link has been sent to your email. Please check your inbox and click on the link to verify your account."
        );
      }
    })();
  }, [router]);
  return (
    <div className="w-96 shadow-2xl p-5 flex flex-col justify-center rounded-2xl bg-white/40 backdrop-blur-md">
      <div className="self-center pb-7 pt-3">
        <Logo mode="dark" className="w-40" />
      </div>
      <div className="pb-5">
        <h3 className="text-lg text-center font-medium text-blue-800">
          Verify your account
        </h3>
        <p className=" text-center italic text-blue-800">{status}</p>
      </div>
    </div>
  );
};

export default page;
