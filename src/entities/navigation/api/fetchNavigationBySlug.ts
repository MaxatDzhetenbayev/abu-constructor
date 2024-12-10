import { backendUrl } from "@/shared/lib/constants";
import { INavigationWithWidgetList } from "@/shared/types";

export async function fetchNavigationWithWidgetsBySlug(slug: string[]): Promise<INavigationWithWidgetList> {
    const response = await fetch(
        `${backendUrl}/navigations/find/by-slug?slug=${slug.join("/")}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    return data;
}