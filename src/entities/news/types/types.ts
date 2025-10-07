import { LocaleRecordType } from "@/i18n";

export interface INews {
  id: number;
  title: LocaleRecordType<string>;
  content: LocaleRecordType<{
    description: string;
    images: string[];
  }>;
  source: newsSource;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewsResponse {
  items: INews[];
  count: number;
}

export interface ICreateNewsFormData {
  title: LocaleRecordType<string>;
  createdAt?: string;
  content: LocaleRecordType<{
    description: string;
    images: string[];
  }>;
  source: newsSource;
}

export interface ICreateNewsDto {
  title: LocaleRecordType<string>;
  createdAt?: string;
  content: LocaleRecordType<{
    description: string;
    images: string[];
  }>;
  source: newsSource;
}

export interface ICreateNewsData {
  data: ICreateNewsDto;
}

export enum newsSource {
  AI = "ai",
  ABU = "abu",
  ALL = "all",
}
