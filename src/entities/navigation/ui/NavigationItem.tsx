"use client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

import { useScroll } from "@/shared/lib/hooks/useScroll";
import { INavigation } from "@/shared/types";

import { DropNavigation } from "./DropNavigation";

interface NavigationItemProps {
  item: INavigation;
  locale: string;
  hoveredItem: number | null;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
}

export const NavigationItem = ({
  item,
  locale,
  hoveredItem,
  handleMouseEnter,
  handleMouseLeave,
}: NavigationItemProps): ReactNode => {
  const path = usePathname();
  const isHoveredItem = hoveredItem === item.id;
  const [scrolled] = useScroll(40);

  return (
    <>
      {item.navigation_type === "content" ? (
        <Link
          style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
          className={clsx(
            "text-center h-[94px] rounded-md flex items-center font-semibold text-[#67493E]",
            path.startsWith(`/${locale}${item.slug}`) && "font-bold"
          )}
          href={`/${locale}/${item.slug}`}
          key={item.id}
        >
          {item.title[locale as string]}
        </Link>
      ) : item.navigation_type === "link" ||
        item.navigation_type === "group-link" ? (
        <Link
          style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
          className={clsx(
            "text-center h-[94px] rounded-md flex items-center font-semibold text-[#67493E]",
            path.startsWith(`/${locale}${item.slug}`) && "font-bold"
          )}
          href={`/${locale}/${item.slug}`}
          key={item.id}
        >
          {item.title[locale as string]}
          {item.navigation_type === "group-link" && (
            <ChevronRight
              className={clsx(
                "transition text-[#67493E]",
                isHoveredItem ? "rotate-90" : "rotate-0"
              )}
            />
          )}
        </Link>
      ) : (
        <div className="relative">
          <button
            className={clsx(
              "h-[94px] flex items-center font-semibold text-[#67493E]",
              path.split("/")[2] == item.slug.split("/")[1] && "font-bold"
            )}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onClick={() => handleMouseEnter(item.id)}
            key={item.id}
            style={{ fontSize: "clamp(16px, 1.5vw, 20px)" }}
          >
            {item.title[locale as string]}
            <ChevronRight
              className={clsx(
                "transitio text-[#67493E]",
                isHoveredItem ? "rotate-90" : "rotate-0"
              )}
            />
          </button>
          {isHoveredItem && item.variant === "vertical" && (
            <DropDownMenu element={item} locale={locale} />
          )}
        </div>
      )}
      {isHoveredItem && item.variant === "horizontal" && (
        <DropNavigation
          item={item}
          locale={locale}
          scrolled={scrolled}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
};

const DropDownMenu = ({
  element,
  locale,
}: {
  locale: string;
  element: INavigation;
}) => {
  return (
    <ul className="shadow-md absolute left-0 rounded-bl-md rounded-br-md bg-[#67493E]">
      {element.children.map((child) => (
        <li key={child.id} className="p-2 group">
          <Link
            className="inline-block p-1 text-white group-hover:underline"
            href={`/${locale}/${element.slug}/${child.slug}`}
          >
            {child.title[locale]}
          </Link>
          {child.children.length > 0 && (
            <DropDownMenu element={child} locale={locale} />
          )}
        </li>
      ))}
    </ul>
  );
};
