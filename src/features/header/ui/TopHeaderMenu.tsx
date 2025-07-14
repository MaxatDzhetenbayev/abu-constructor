"use client";
import clsx from "clsx";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { topHeaderMenuList } from "@/shared/config/topHeaderMenu";

export const TopHeaderMenu = () => {
  const t = useTranslations("top_menu");

  return (
    <ul
      className="text-white items-center hidden [@media(min-width:890px)]:flex py-3"
      style={{ gap: "clamp(10px, 1.5vw, 15px)" }}
    >
      {topHeaderMenuList.map((item, index) => (
        <li key={index}>
          <Link
            href={item.link}
            key={index}
            target="_blank"
            className={clsx(
              "text-[#67493E] font-bold  ",
              index !== 0 && "before:content-['•'] before:mr-4"
            )}
          >
            {t(item.title)}↗
          </Link>
        </li>
      ))}
    </ul>
  );
};
