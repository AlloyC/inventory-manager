"use client";
import { createContext, useContext, useState } from "react";
import { UserData, UserDataContext } from "../types/type";

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

  return (
    <User.Provider value={{ ...(userData as UserData), setUserData }}>
      {children}
    </User.Provider>
  );
};

export default UserContext;
