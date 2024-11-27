"use client";
import { useParams } from "next/navigation";
import {
  CardBase,
} from "@/entities/Card";
export const Card = ({
  content,
  locale,
  variant,
  styles,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
  styles?: string;
}) => {
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
