import { INavigation } from "@/entities/";

import { backendUrl } from "@/shared/lib/constants";


export interface NavigationEditModalForm {
    slug: string;
    title: {
        [key: string]: string;
    };
    variant: string;
}

export async function fetchUpdateNavigation({ id, data }: { id: number, data: NavigationEditModalForm }): Promise<INavigation> {
    const resonse = await fetch(`${backendUrl}/navigations/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return resonse.json();

}