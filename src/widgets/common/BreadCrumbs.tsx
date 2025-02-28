"use client";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

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

  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);

  // получение ширины экрана
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Код будет выполнен только на клиенте
      const handleResize = () =>
        setIsMobileWidth(() => window.innerWidth < 768);
      window.addEventListener("resize", handleResize);

      // Установить начальное значение
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getCrumbsElementForView = (crumbs: string[]) => {
    if (!Array.isArray(crumbs)) return [];
    // Вернуть массив crumbs кроме 2 элемента массива
    if (crumbs.length > 2)
      return [...crumbs.slice(0, 1), ...crumbs.slice(2, crumbs.length)];
    return crumbs;
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {getCrumbsElementForView(crumbs)?.map(
            ({ title, navigation_type: type, slug }: any, idx: number) => (
              <BreadcrumbItem
                className="text-abu_primary font-bold text-xl"
                key={idx}
              >
                <BreadcrumbLink
                  href={
                    ["content", "group-link", "detail"].includes(type)
                      ? `/${locale}/${slug}`
                      : undefined
                  }
                  style={{
                    fontSize: "clamp(18px, 1.4vw, 24px)",
                  }}
                >
                  {isMobileWidth ? `${title.slice(0, 30)}...` : title}
                </BreadcrumbLink>
                {idx < getCrumbsElementForView(crumbs)?.length - 1 && (
                  <ChevronRight size={30} className="mb-1" />
                )}
              </BreadcrumbItem>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
