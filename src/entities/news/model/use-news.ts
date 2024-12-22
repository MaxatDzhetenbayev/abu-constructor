import { backendUrl } from "@/shared/lib/constants";

import { INews } from "./types";

import { useQuery } from "@tanstack/react-query";

export const useNews = () => {
    return useQuery<INews[]>({
        queryKey: ["news"],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/news`);
            return response.json();
        },
    });
}