"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserData, UserDataContext } from "../types/type";
import supabase from "../SupabaseCredentials";

const User = createContext<null | UserDataContext>(null);

export const useUser = () => {
  const context = useContext(User);
  if (!context) {
    throw new Error("not a child of user context");
  }
  return context;
};

export const getSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session) {
      throw error;
    }
    return session;
  } catch (error) {
    console.log("Error getting session:", error);
  }
};

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserData>(null);

  // Fetch user details from Supabase
  const fetchUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
        .single();
      if (error) {
        throw error;
      }
      user &&
        setUserData({
          username: user.username || "",
          email: user.email || "",
          id: user.user_id || "",
          avatar_url: user.avatar_url || "",
        });
      return user;
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <User.Provider value={{ ...(userData as UserData), setUserData }}>
      {children}
    </User.Provider>
  );
};

export default UserContext;
