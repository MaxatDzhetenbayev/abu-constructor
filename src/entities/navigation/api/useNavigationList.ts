import { backendUrl } from "@/shared/lib/constants";
import { INavigation } from "@/shared/types";

import { useQuery } from "@tanstack/react-query";

export function useNavigationList() {
  return useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations`);
      return response.json();
    },
  });
}
