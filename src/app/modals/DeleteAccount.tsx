"use client";
import { Button } from "@/components/ui/button";
import supabase from "../SupabaseCredentials";
import { getSession } from "../Provider/UserContext";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

const DeleteAccount = ({
  setDeleteAccount,
}: {
  setDeleteAccount: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  const handleDelete = async () => {
    const userSession = await getSession();
    if (!userSession) return [];
    //delete account- sign out before delete
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", userSession.user.id);
      if (error) throw error;
      //Signout function
      signOut().catch((err) => console.log("error signing out: ", err));
      console.log("deleting user with id: ", userSession.user.id);
      router.push("/auth/login");
    } catch (err) {
      console.log("error deleting user:", err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/10 z-30 flex items-center justify-center">
      <div
        onClick={() => setDeleteAccount(false)}
        className="absolute inset-0 z-40"
      />
      <div className="flex flex-col items-center z-50 bg-white rounded-2xl p-5 shadow-xl min-w-72 max-w-96 min-h-48 border justify-center">
        <h2 className="text-xl font-semibold mb-3">Delete Account</h2>
        <p className="mb-4 text-center">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button variant={"outline"} onClick={() => setDeleteAccount(false)}>
            Cancel
          </Button>
          <Button className="bg-red-500 text-white" onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
