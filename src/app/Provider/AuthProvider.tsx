import { useContext, createContext, useState, useReducer } from "react";

export const AuthContext = createContext<null | {}>(null);

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // You can use context or any auth logic here
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
