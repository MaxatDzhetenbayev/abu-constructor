"use client";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { Logo, LogoSize } from "@/entities";
import { NavigationList } from "@/entities/navigation";
import { ChangeLocale } from "@/features";
import { SearchWidget } from "@/widgets";

import { navbarStyles } from "../config/navbarStyles";
import { getNavbarClass } from "../libs/getNavbarClass";
import { useNavbarState } from "../model/useNavbarState";

export const Navbar = () => {
  const locale = useParams().locale as string;
  const path = usePathname();

  const { scrolled, hoveredItem, setHoveredItem } = useNavbarState();

  return (
    <nav
      className={clsx(
        navbarStyles.default,
        getNavbarClass({ scrolled, hoveredItem, path, locale })
      )}
    >
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className="w-[1300px] flex gap-10  justify-between items-center"
      >
        <Logo size={LogoSize.MEDIUM} />
        <section className="py-0 gap-5 items-center justify-center flex">
          <NavigationList
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <section className="flex items-center gap-1">
            <SearchWidget />
            <div className="h-[22px] w-[4px] bg-[#BABABA]"></div>
            <ChangeLocale />
          </section>
        </section>
      </div>
    </nav>
  );
};
