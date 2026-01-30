import { Dispatch, SetStateAction } from "react";

// Navigation link
export interface NavbarLink {
  name: string;
  path: string;
  Logo: any;
  currentPath?: string;
  setCurrentPath?: Dispatch<SetStateAction<string>>;
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
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  current_qty: number;
  image: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  status: "planning" | "running" | "completed";
  images?: { url: string }[];
  project_components: (Partial<InventoryComponent> & { qty: number })[] | [];
  steps: { step: string }[] | [];
}

export interface LabelsProps {
  projectData: Project | null;
  setProjectData: Dispatch<SetStateAction<Project | null>>;
}
