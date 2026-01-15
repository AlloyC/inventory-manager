import { Dispatch, SetStateAction } from "react";

// Navigation link
export interface NavbarLink {
  name: string;
  path: string;
  Logo: React.ReactElement;
  status?: boolean;
}

export interface UserData {
  firstName: string;
}

export interface UserDataContext extends UserData {
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

export interface Card {
  className: string;
  property: string;
  value: number;
  icon: React.ReactElement;
}
