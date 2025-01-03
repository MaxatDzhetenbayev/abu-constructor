import { backendUrl } from "@/shared/lib/constants";

import { INewsResponse } from "./types";

import { useQuery } from "@tanstack/react-query";

interface IUseNewsProps {
    limit?: number;
    offset?: number;
}

export const useNews = ({ limit, offset }: IUseNewsProps) => {
    return useQuery<INewsResponse>({
        queryKey: ["news", limit, offset],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/news?limit=${limit}&offset=${offset}`);
            return response.json();
        },
        refetchOnWindowFocus: false,

    });
}