import { useQuery } from "react-query";
import { api } from "./api";

export interface queries {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  filter?: any;
}
export default function useGet(path: string, queries: queries = {}) {
  return useQuery("get", async () => {
    const { data } = await api.get(path, {
      params: queries,
    });
    return data;
  });
}
