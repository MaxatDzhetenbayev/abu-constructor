import { backendUrl } from "@/shared/lib/constants";

import { INews } from "./types";

import { useQuery } from "@tanstack/react-query";

export const useNews = ({ limit, offset }: { limit?: number, offset?: number }) => {
    return useQuery<{ items: INews[], count: number }>({
        queryKey: ["news", limit, offset],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/news?limit=${limit}&offset=${offset}`);
            return response.json();
        },
        refetchOnWindowFocus: false,

    });
}