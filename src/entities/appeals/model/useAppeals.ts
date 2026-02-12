import { backendUrl } from "@/shared/lib/constants";

import { AppealType, IAppeal } from "../types";
import { useQuery } from "@tanstack/react-query";

interface UseAppealsParams {
  from?: string;
  to?: string;
  appeal_type?: AppealType;
  full_name?: string;
  is_checked?: string; // "true" | "false"
}

export const useAppeals = (params: UseAppealsParams) => {
  const { from, to, appeal_type, full_name, is_checked } = params;

  return useQuery<IAppeal[]>({
    queryKey: ["appeals", from, to, appeal_type, full_name, is_checked],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (from) searchParams.append("from", from);
      if (to) searchParams.append("to", to);
      if (appeal_type) searchParams.append("appeal_type", appeal_type);
      if (full_name) searchParams.append("full_name", full_name);
      if (is_checked) searchParams.append("is_checked", is_checked);

      const response = await fetch(
        `${backendUrl}/appeals?${searchParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appeals");
      }

      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

