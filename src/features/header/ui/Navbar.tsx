"use client";
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";

import { NavigationList } from "@/entities/navigation";
import { ChangeLocale } from "@/features";
import { BurgerMenu, SearchWidget } from "@/widgets";

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
        className="xl:w-[1300px] mx-auto  items-center grid grid-cols-[1fr_auto] "
      >
        <section className="py-0 gap-5 items-center justify-between hidden md:flex h-[50px]">
          <NavigationList
          // hoveredItem={hoveredItem}
          // setHoveredItem={setHoveredItem}
          />
        </section>
        <div className="flex justify-end">
          <SearchWidget />
          <ChangeLocale />
          <BurgerMenu />
        </div>
      </div>
    </nav>
  );
};
