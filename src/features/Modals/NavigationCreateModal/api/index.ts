import { backendUrl } from "@/shared/lib/constants";
import { INavigation } from "@/widgets/NavigationList/model";

export async function fetchCreateNavigationItem(
  data: Pick<INavigation, "slug" | "title" | "navigation_type" | "parent_id">
) {
  const response = await fetch(`${backendUrl}/navigations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}