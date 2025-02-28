"use client";
import { ChevronRight } from "lucide-react";

import { backendUrl } from "@/shared/lib/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/shared/ui";

import { useQuery } from "@tanstack/react-query";

export const BreadCrumbs = ({
  slug,
  locale,
}: {
  slug: string[];
  locale: string;
}) => {
  const { data: crumbs } = useQuery({
    queryKey: ["crumbs"],
    queryFn: async () => {
      const response = await fetch(
        `${backendUrl}/navigations/get/crumbs?slug=${slug}&locale=${locale}`
      );
      return response.json();
    },
  });


  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs?.map(
            ({ title, navigation_type: type, slug }: any, idx: number) => (
              <BreadcrumbItem
                className="text-abu_primary font-bold text-lg flex items-center"
                key={idx}
              >
                <BreadcrumbLink
                  href={
                    ["content", "group-link", "detail"].includes(type)
                      ? `/${locale}/${slug}`
                      : undefined
                  }
                  className="text-md"
                >
                  {title.toUpperCase()}
                </BreadcrumbLink>
                {idx < crumbs?.length - 1 && (
                  <ChevronRight size={30} />
                )}
              </BreadcrumbItem>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
