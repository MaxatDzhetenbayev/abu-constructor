"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { topHeaderMenuList } from "@/shared/config/topHeaderMenu";

export const TopHeaderMenu = () => {
  const t = useTranslations();

  return (
    <ul
      className="text-white items-center hidden [@media(min-width:890px)]:flex py-3"
      style={{ gap: "clamp(10px, 1.5vw, 15px)" }}
    >
      <Link className="text-[#67493E] font-bold" href="https://abu.edu.kz/">
        {t("old_version")}↗
      </Link>

      {topHeaderMenuList.map((item, index) => (
        <li key={index}>
          <Link
            href={item.link}
            key={index}
            target="_blank"
            className="text-[#67493E] font-bold before:content-['•'] before:mr-4"
          >
            {item.title}↗
          </Link>
        </li>
      ))}
    </ul>
  );
};
