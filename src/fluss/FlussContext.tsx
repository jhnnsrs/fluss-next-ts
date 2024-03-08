import { FlussClient, FlussConfig, FlussContextType } from "./types";
import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

export const FlussContext = React.createContext<FlussContextType>({
  configure: () => {
    throw Error("No Provider in context not configured");
  },
});

export const useFluss = () => useContext(FlussContext);

export const useFlussQuery = (query: any) => {
  const { client } = useFluss();
  return useQuery(query, { client: client });
};

export function withFluss<T extends (options: any) => any>(func: T): T {
  const Wrapped = (nana: any) => {
    const { client } = useFluss();
    return func({ ...nana, client: client });
  };
  return Wrapped as T;
}
