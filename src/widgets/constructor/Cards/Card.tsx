"use client";
import { useParams } from "next/navigation";
import {
  CardBase,
} from "@/entities/Card";
import { ICard } from "./model/Cards.interface";


export const Card = ({
  content,
  locale,
  variant,
  styles,
}: ICard) => {
  const params = useParams();
  const slugs = params.slug as string[];
  const currentPath = slugs[slugs.length - 1];

  return (
    <CardBase
      content={content}
      variant={variant}
      locale={locale}
      currentPath={currentPath}
      styles={styles}
    />
  );

};
