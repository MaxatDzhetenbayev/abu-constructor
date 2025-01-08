import { INews } from '@/entities/news/model/types';
import { LocaleRecordType } from '@/i18n';
import { backendUrl } from "@/shared/lib/constants";

export async function fetchCreateAdminNavigation(
    data: { data: INews, images: LocaleRecordType<File[]> }
): Promise<INews> {
    const response = await fetch(`${backendUrl}/news`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const res = response.json();
    return res;
}