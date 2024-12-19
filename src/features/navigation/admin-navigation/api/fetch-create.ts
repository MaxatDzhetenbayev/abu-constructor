import { INavigation } from "@/entities";
import { backendUrl } from "@/shared/lib/constants";

export async function fetchCreateAdminNavigation(
    data: Pick<INavigation, "slug" | "title" | "navigation_type" | "parent_id">
): Promise<INavigation> {
    const response = await fetch(`${backendUrl}/navigations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const res = response.json();
    return res;
}