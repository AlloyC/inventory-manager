"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Card, InventoryComponent } from "../types/type";
import supabase from "../SupabaseCredentials";
import { getSession } from "./UserContext";

const Inventory = createContext<{
  summaries: Card[];
  inventory: InventoryComponent[];
  lowStock: InventoryComponent[];
  totalProjectPages: number;
  totalInventoriesPages: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);
const Page = createContext<{
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setFilter: React.Dispatch<React.SetStateAction<statusType | null>>;
} | null>(null);

export const useInventory = () => {
  const context = useContext(Inventory);
  if (!context) {
    throw new Error("not a child of inventory context");
  }
  return context;
};

export const usePage = () => {
  const context = useContext(Page);
  if (!context) {
    throw new Error("not a child of page context");
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
          .is("deleted_at", null)
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

export type statusType = "In Stock" | "Low Stock" | "Out of Stock";
// Fetch user inventory components from Supabase with pagination
export const fetchPaginatedInventory: (
  page: number,
  pageSize: number,
  status?: statusType[],
) => Promise<InventoryComponent[]> = async (
  page: number,
  pageSize: number,
  status?: statusType[],
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    const { data: components, error } = await supabase
      .from("components")
      .select("*")
      .eq("user_id", userSession.user.id)
      .in("status", status || ["Low Stock", "In Stock", "Out of Stock"])
      .order("created_at", { ascending: true })
      .is("deleted_at", null)
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) {
      throw error;
    }
    return components || [];
  } catch (error) {
    console.log("Error fetching paginated inventory:", error);
    return [];
  }
};

export const searchInventory: (
  page: number,
  pageSize: number,
  searchTerm: string,
  status?: statusType[],
) => Promise<InventoryComponent[]> = async (
  page: number,
  pageSize: number,
  searchTerm: string,
  status?: statusType[],
) => {
  const userSession = await getSession();
  if (!userSession) return [];
  try {
    const { data: components, error } = await supabase
      .from("components")
      .select("*")
      .eq("user_id", userSession.user.id)
      .in("status", status || ["Low Stock", "In Stock", "Out of Stock"])
      .order("created_at", { ascending: true })
      .is("deleted_at", null)
      .ilike("name", `%${searchTerm}%`)
      .range((page - 1) * pageSize, page * pageSize - 1);
    if (error) {
      throw error;
    }
    return components || [];
  } catch (error) {
    console.log("Error fetching paginated inventory:", error);
    return [];
  }
};

const InventoryContext = ({ children }: { children: React.ReactNode }) => {
  const [summaries, setSummaries] = useState<Card[]>([]);
  const [inventory, setInventory] = useState<InventoryComponent[]>([]);
  const [lowStock, setLowStock] = useState<InventoryComponent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<statusType | null>(null);
  const [totalProjectPages, setTotalProjectPages] = useState(1);
  const [totalInventoriesPages, setTotalInventoriesPages] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getTableLengths()
      .then((tableLengths) => {
        setSummaries(tableLengths);
        return tableLengths;
      })
      .then((tableLengths) => {
        setTotalProjectPages(Math.ceil(tableLengths[3].value / 10));
        setTotalInventoriesPages(Math.ceil(tableLengths[0].value / 10));
      });
    fetchPaginatedInventory(1, 10, ["Low Stock"]).then((inventoryData) =>
      setLowStock(inventoryData),
    );
  }, [refresh]);

  useEffect(() => {
    let serachTimeout: NodeJS.Timeout;
    if (search !== "") {
      serachTimeout = setTimeout(() => {
        searchInventory(page, 10, search, filter ? [filter] : undefined).then(
          (inventoryData) => setInventory(inventoryData),
        );
      }, 500);
    } else {
      filter
        ? fetchPaginatedInventory(page, 10, [filter]).then((inventoryData) =>
            setInventory(inventoryData),
          )
        : fetchPaginatedInventory(page, 10).then((inventoryData) =>
            setInventory(inventoryData),
          );
    }
    const timeout = setTimeout(() => setRefresh(false), 500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(serachTimeout);
    };
  }, [page, filter, refresh, search]);

  return (
    <Inventory.Provider
      value={{
        summaries,
        totalProjectPages,
        totalInventoriesPages,
        inventory,
        lowStock,
        setRefresh,
        search,
        setSearch,
      }}
    >
      <Page.Provider value={{ setPage, page, setFilter }}>
        {children}
      </Page.Provider>
    </Inventory.Provider>
  );
};

export default InventoryContext;
