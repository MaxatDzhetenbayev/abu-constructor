import { backendUrl } from "@/shared/lib/constants";

import { INewsResponse } from "../types/types";
import { useQuery } from "@tanstack/react-query";

interface IUseNewsProps {
  limit?: number;
  offset?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  lang?: string;
}

export const useNews = ({
  limit,
  offset,
  startDate,
  endDate,
  search,
  lang,
}: IUseNewsProps) => {
  return useQuery<INewsResponse>({
    queryKey: ["news", limit, offset, search, startDate, endDate, lang],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (limit) params.append("limit", String(limit));
      if (offset) params.append("offset", String(offset));
      if (search) params.append("query", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (lang) params.append("lang", lang);

      const response = await fetch(`${backendUrl}/news?${params.toString()}`);
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};
