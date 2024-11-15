"use client";
import { Skeleton } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { NavigationList } from "./Navigation/NavigationList";
import { useScroll } from "@/shared/lib/hooks/useScroll";
import { INavigation } from "@/shared/lib/types";
import { backendUrl } from "@/shared/lib/constants";
import Image from "next/image";
import { ChangeLocale } from "@/features";

export const Navbar = () => {
  const params = useParams();
  const path = usePathname();
  const { data: pages, isFetching } = useQuery<INavigation[]>({
    queryKey: ["navigations"],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/navigations`);
      return response.json();
    },
  });

  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [scrolled] = useScroll(40);

  return (
    <nav
      className={clsx(
        "md:z-50 md:top-0 hidden [@media(min-width:890px)]:flex justify-center items-center shadow-xl px-3 bg-abu_primary",
        scrolled
          ? "md:fixed md:left-0 md:right-0 md:top-0"
          : hoveredItem
            ? "bg-abu_primary"
            : path === `/${params.locale}/home`
              ? "md:static bg-none bg-black/30"
              : "md:static bg-abu_primary",
      )}
    >
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className="w-[1300px] flex gap-10  justify-between items-center"
      >
        <Link
          href="/"
          style={{ position: "relative", height: "80px", width: "280px" }}
        >
          <Image
            src={`/images/logo-white.png`}
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </Link>
        <section className="py-2 gap-5 items-center justify-center flex">
          {isFetching ? (
            <div className="w-[600px] grid place-items-center h-[5.875rem]">
              <Skeleton className="w-full h-[3rem]" />
            </div>
          ) : pages ? (
            <NavigationList
              locale={params.locale as string}
              pages={pages}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
            />
          ) : (
            <span>Навигация не найдена</span>
          )}

          {scrolled && <ChangeLocale />}
        </section>
      </div>
    </nav>
  );
};
