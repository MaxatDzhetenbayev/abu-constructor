import { backendUrl } from "@/shared/lib/constants";

export const fetchOneNews = async (id: number) => {
    const response = await fetch(`${backendUrl}/news/${id}`);
    return response.json();
}