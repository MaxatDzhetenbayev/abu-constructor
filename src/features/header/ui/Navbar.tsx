"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";

import { ChangeLocale } from "@/features";
import { Logo, LogoSize } from "@/entities";
import { NavigationList } from "@/entities/navigation";

import { useNavbarState } from "../model/useNavbarState";
import { getNavbarClass } from "../libs/getNavbarClass";
import { navbarStyles } from "../config/navbarStyles";

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
          {scrolled && <ChangeLocale />}
        </section>
      </div>
    </nav>
  );
};
