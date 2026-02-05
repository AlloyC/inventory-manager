import { Button } from "@/components/ui/button";
import supabase from "../SupabaseCredentials";
import { getSession } from "../Provider/UserContext";
import { Dispatch, SetStateAction } from "react";

const DeleteAccount = ({
  setDeleteAccount,
}: {
  setDeleteAccount: Dispatch<SetStateAction<boolean>>;
}) => {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  const handleDelete = async () => {
    const userSession = await getSession();
    if (!userSession) return [];
    //Signout function
    signOut().catch((err) => console.log("error signing out: ", err));
    //delete account- sign out before delete
    try {
      const { error } = await supabase.auth.admin.deleteUser(
        userSession.user.id,
      );
      if (error) throw error;
    } catch (err) {
      console.log("error deleting user:", err);
    }
  };
  return (
    <div
      onClick={() => setDeleteAccount(false)}
      className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-xl min-w-72 max-w-96 min-h-48 border justify-center">
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
