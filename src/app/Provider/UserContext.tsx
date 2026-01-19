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

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<null | UserData>(null);

  const fetchUserData = async () => {
    const user = await fetchUser();
    if (user) {
      const components = await fetchInventory();
      console.log(user, components);
    }
  };

  // Fetch user details from Supabase
  const fetchUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return user;
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
  // Fetch user inventory components from Supabase
  const fetchInventory = async () => {
    try {
      const { data: components, error } = await supabase
        .from("components")
        .select("*");

      if (error) {
        throw error;
      }
      return components;
    } catch (error) {
      console.log("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <User.Provider value={{ ...(userData as UserData), setUserData }}>
      {children}
    </User.Provider>
  );
};

export default UserContext;
