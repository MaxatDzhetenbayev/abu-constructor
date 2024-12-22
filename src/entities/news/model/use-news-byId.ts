import { backendUrl } from "@/shared/lib/constants";

import { INews } from "./types";

import { useQuery } from "@tanstack/react-query";

export const useNewsbyId = (id: number) => {
    return useQuery<INews>({
        queryKey: ["news", id],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/news/${id}`);
            return response.json();
        },
        refetchOnWindowFocus: false,
    });
}