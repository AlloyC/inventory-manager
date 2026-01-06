"use client";
import { createContext, useContext } from "react";

const User = createContext<null | object>(null);

export const useUser = () => {
  const context = useContext(User);
  try {
    if (!context) {
      throw "not a child of user context";
    }
    return context;
  } catch (error) {
    console.error(error);
  }
};

const UserContext = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <User.Provider value={{}}>{children}</User.Provider>;
};

export default UserContext;
