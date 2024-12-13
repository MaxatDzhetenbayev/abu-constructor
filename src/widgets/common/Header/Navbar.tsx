"use client";
import React, { useState } from "react";

import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
import { useScroll } from "@/shared/lib/hooks/useScroll";
import { ChangeLocale } from "@/features";
import { Logo } from "@/entities/logo";
import { LogoSize } from "@/entities/logo/model";
import { NavigationList } from "@/entities/navigation";

export const Navbar = () => {
  const params = useParams();
  const path = usePathname();

  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [scrolled] = useScroll(40);

  return (
    <nav
      className={clsx(
        "md:z-50  md:top-0 hidden [@media(min-width:890px)]:flex justify-center items-center shadow-xl px-3 bg-abu_primary",
        scrolled
          ? "md:fixed md:left-0 md:right-0 md:top-0"
          : hoveredItem
            ? "bg-abu_primary"
            : path === `/${params.locale}/home`
              ? "md:static  bg-none bg-black/30"
              : "md:static bg-abu_primary"
      )}
    >
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className="w-[1300px] flex gap-10  justify-between items-center"
      >
        <Logo size={LogoSize.MEDIUM} />
        <section className="py-0 gap-5 items-center justify-center flex">
          <NavigationList
            locale={params.locale as string}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          {scrolled && <ChangeLocale />}
        </section>
      </div>
    </nav>
  );
};
