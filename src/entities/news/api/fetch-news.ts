import { backendUrl } from "@/shared/lib/constants";

export const fetchAllNews = async () => {
    const response = await fetch(`${backendUrl}/news`);
    return response.json();
}