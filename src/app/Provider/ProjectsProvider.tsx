"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Project } from "../types/type";
import supabase from "../SupabaseCredentials";
import { getSession } from "./UserContext";

const Projects = createContext<{
  pinned: Project[];
  projects: Project[];
} | null>(null);

const Page = createContext<{
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
} | null>(null);

export const useProjects = () => {
  const context = useContext(Projects);

  if (!context) throw new Error("Component is not a child of Project context.");
  return context;
};

export const usePage = () => {
  const context = useContext(Page);
  if (!context) {
    throw new Error("not a child of page context");
  }
  return context;
};

const getProjects = async (
  page: number,
  pageSize: number,
  pinned?: boolean,
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userSession.user.id)
      .eq("pinned", pinned || false)
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) {
      throw error;
    }
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pinned, setPinned] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getProjects(page, 10).then((projects) => setProjects(projects));
  }, [page]);

  useEffect(() => {
    getProjects(1, 3, true).then((projects) => setPinned(projects));
  }, []);

  return (
    <Projects.Provider value={{ pinned, projects }}>
      <Page.Provider value={{ setPage, page }}>{children}</Page.Provider>
    </Projects.Provider>
  );
};

export default ProjectsProvider;
