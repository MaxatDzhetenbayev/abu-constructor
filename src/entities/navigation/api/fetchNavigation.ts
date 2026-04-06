import { backendUrl } from "@/shared/lib/constants";

import { INavigation } from './../model/navigation.model';

export async function fetchNavigation(): Promise<INavigation[]> {
    const response = await fetch(
        `${backendUrl}/navigations`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    return data;
}