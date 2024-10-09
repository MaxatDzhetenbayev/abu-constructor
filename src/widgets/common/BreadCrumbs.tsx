"use client";
import { backendUrl } from "@/shared/lib/constants";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const BreadCrumbs = ({
  slug,
  locale,
}: {
  slug: string[];
  locale: string;
}) => {
  let { data: crumbs } = useQuery({
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
    const handleResize = () => setIsMobileWidth(() => window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    window.innerWidth,

    window.addEventListener,
  ])

  console.log(isMobileWidth)

  const getCrumbsElementForView = (crumbs: string[]) => {
    if (!crumbs) return [];
    // Вернуть массив crumbs кроме 2 элемента массива
    return [...crumbs.slice(0, 1), ...crumbs.slice(2, crumbs.length)];
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {getCrumbsElementForView(crumbs)?.map(
            ({ title, navigation_type: type, slug }: any, idx: number) => (
              <BreadcrumbItem
                className="text-red-950 font-bold text-xl"
                key={idx}
              >
                <BreadcrumbLink
                  href={
                    ["content", "group-link"].includes(type)
                      ? `/${locale}/${slug}`
                      : undefined
                  }
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 18px)",
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
