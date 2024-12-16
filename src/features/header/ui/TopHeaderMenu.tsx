import React from "react";
import { topHeaderMenuList } from "@/shared/config/topHeaderMenu";
import Link from "next/link";

export const TopHeaderMenu = () => {
  return (
    <ul
      className="text-white items-center hidden [@media(min-width:890px)]:flex"
      style={{ gap: "clamp(15px, 1.5vw, 40px)" }}
    >
      {topHeaderMenuList.map((item, index) => (
        <li key={index}>
          <Link href={item.link} key={index} target="_blank">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
