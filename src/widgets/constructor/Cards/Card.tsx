"use client";
import { useParams } from "next/navigation";
import {
  CardBase,
  CardWithModal,
  //   CardHoverAnimation,
} from "@/entities/Card";
export const Card = ({
  content,
  locale,
  variant,
  size,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
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
    />
  );

  switch (variant) {
    case "with_image":
      <CardBase
        content={content}
        variant={variant}
        locale={locale}
        currentPath={currentPath}
      />;
    case "base":
    //  case "horizontal":
    case "with_file":
    case "with_modal":
      return (
        <CardBase
          content={content}
          variant={variant}
          locale={locale}
          currentPath={currentPath}
        />
      );
    default:
      return (
        <CardBase
          content={content}
          variant={variant}
          locale={locale}
          currentPath={currentPath}
        />
      );
  }
};
