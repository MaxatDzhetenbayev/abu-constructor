import { backendUrl } from "@/shared/lib/constants";

import { INewsResponse } from "./types";

import { useQuery } from "@tanstack/react-query";

interface IUseNewsProps {
  limit?: number;
  offset?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export const useNews = ({
  limit,
  offset,
  startDate,
  endDate,
  search,
}: IUseNewsProps) => {
  return useQuery<INewsResponse>({
    queryKey: ["news", limit, offset, search, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (limit) params.append("limit", String(limit));
      if (offset) params.append("offset", String(offset));
      if (search) params.append("query", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(`${backendUrl}/news?${params.toString()}`);
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};
