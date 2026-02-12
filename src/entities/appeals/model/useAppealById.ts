import { backendUrl } from "@/shared/lib/constants";

import { IAppeal } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useAppealById = (id: number) => {
  return useQuery<IAppeal>({
    queryKey: ["appeals", id],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/appeals/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch appeal");
      }

      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

