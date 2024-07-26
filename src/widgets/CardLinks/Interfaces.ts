import { BackedPage } from "@/shared/lib/types";

export interface ICardLinkProps {
  image: string;
  Title: string;
  HRef: string;
}

export interface ICardLinkListProps {
  title: string;
  items: ICardLinkProps[];
}

export interface IEditCardLinkProps {
  titleRu: string;
  titleKz: string;
  hrefRu: string;
  hrefKz: string;
  savedTemplate: string;
  templateWidgets: string;
  image: File | null;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
}
