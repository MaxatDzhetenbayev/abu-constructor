"use client";
import React from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

import { ChangeLocale } from "@/features";
import { Logo, LogoSize } from "@/entities";
import { NavigationList } from "@/entities/navigation";

import { useNavbarState } from "../model/useNavbarState";
import { navbarStyles } from "../config/navbarStyles";

export const Navbar = () => {
  const params = useParams();

  const { scrolled, hoveredItem, setHoveredItem } = useNavbarState();

  return (
    <nav
      className={clsx(
        navbarStyles.default,
        scrolled
          ? navbarStyles.scrolled
          : hoveredItem
            ? navbarStyles.hovered
            : navbarStyles.notHovered
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
