"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Card } from "../types/type";
import supabase from "../SupabaseCredentials";
import { getSession } from "./UserContext";

const Inventory = createContext<{ summaries: Card[] } | null>(null);

export const useInventory = () => {
  const context = useContext(Inventory);
  if (!context) {
    throw new Error("not a child of inventory context");
  }
  return context;
};

// fetch total count of user inventory components from Supabase
export const getTableLengths = async () => {
  try {
    const userSession = await getSession();
    if (!userSession) return [];
    const [components, pendingProjects, runningProjects, totalProjects] =
      await Promise.all([
        supabase
          .from("components")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userSession.user.id),
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userSession.user.id)
          .eq("status", "pending"),
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userSession.user.id)
          .eq("status", "running"),
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userSession.user.id),
      ]);

    const cardCounts = [
      { property: "Total component", value: components.count || 0 },
      { property: "Running project", value: runningProjects.count || 0 },
      { property: "Pending projects", value: pendingProjects.count || 0 },
      { property: "Total project", value: totalProjects.count || 0 },
    ];
    return cardCounts;
  } catch (error) {
    console.log("Error fetching count:", error);
  }

  return [
    { property: "Total component", value: 0 },
    { property: "Running project", value: 0 },
    { property: "Pending projects", value: 0 },
    { property: "Total project", value: 0 },
  ];
};

const InventoryContext = ({ children }: { children: React.ReactNode }) => {
  const [summaries, setSummaries] = useState<Card[]>([]);

  useEffect(() => {
    getTableLengths().then((tableLengths) => setSummaries(tableLengths));
  }, []);
  return (
    <Inventory.Provider value={{ summaries }}>{children}</Inventory.Provider>
  );
};

export default InventoryContext;
