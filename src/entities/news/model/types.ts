import { LocaleRecordType } from "@/i18n"

export interface INews {
    id: number,
    title: LocaleRecordType<string>
    content: LocaleRecordType<{
        description: string,
        images: string[],
    }>,
    viewCount: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface INewsResponse {
    items: INews[],
    count: number
}