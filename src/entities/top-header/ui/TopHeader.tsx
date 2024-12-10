import React from "react";
import Link from "next/link";
import { topHeaderMenuList } from "../model";

export const TopHeader = () => {
  return (
    <section
      className="text-white items-center hidden [@media(min-width:890px)]:flex"
      style={{ gap: "clamp(15px, 1.5vw, 40px)" }}
    >
      {topHeaderMenuList.map((item, index) => (
        <Link href={item.link} key={index} target="_blank">
          {item.title}
        </Link>
      ))}
    </section>
  );
};
