import { backendUrl } from "@/shared/lib/constants";

export const fetchRemoveContent = async (id: number | undefined) => {
    if (!id) return;
    const response = await fetch(`${backendUrl}/contents/${id}`, {
        method: "DELETE",
    });
    return response.json();
}