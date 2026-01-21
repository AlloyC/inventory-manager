import { Dispatch, SetStateAction } from "react";

// Navigation link
export interface NavbarLink {
  name: string;
  path: string;
  Logo: any;
}

export interface UserData {
  username: string;
  email: string;
  id: string;
  email_verified?: boolean;
}

export interface UserDataContext extends UserData {
  setUserData: Dispatch<SetStateAction<UserData | null>>;
}

export interface Card {
  property: string;
  value: number;
}

export interface InventoryComponent {
  id: string;
  name: string;
  value: string;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  current_qty: number;
  image: string;
}
