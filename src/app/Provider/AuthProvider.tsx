"use client";
import {
  useContext,
  createContext,
  useState,
  useReducer,
  SetStateAction,
  Dispatch,
} from "react";

export const AuthContext = createContext<null | {
  deleteAccount: boolean;
  setDeleteAccount: Dispatch<SetStateAction<boolean>>;
}>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("component is not a child of auth context");
  return context;
};

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [deleteAccount, setDeleteAccount] = useState(false);
  return (
    <AuthContext.Provider value={{ deleteAccount, setDeleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
