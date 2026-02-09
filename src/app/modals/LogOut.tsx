"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import supabase from "../SupabaseCredentials";
import { useRouter } from "next/navigation";

const LogOut = ({
  setLogout,
}: {
  setLogout: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  //Signout function
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/auth/login");
    } catch (error) {
      console.log("error signing-out: ", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-xl min-w-80 min-h-48 border justify-center">
        <h2 className="text-xl font-semibold mb-3">Log Out</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex gap-3 mt-5">
          <Button
            variant="outline"
            onClick={() => setLogout(false)}
            className="text-red-500 border-red-500 hover:border-black"
          >
            Cancel
          </Button>
          <Button onClick={signOut} className="bg-red-500 text-white">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
