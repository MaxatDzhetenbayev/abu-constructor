import Link from "next/link";
import React from "react";

import { Logo } from "@/entities/logo";
import { LogoSize } from "@/entities/logo/model";
import { ChangeLocale } from "@/features";
import { topHeaderMenuList } from "@/shared/config/topHeaderMenu";
import { BurgerMenu } from "@/widgets";
import { SearchWidget } from "@/widgets/common/search-widget/search-widget";

export const TopHeader = () => {
  return (
    <section
      className="bg-abu_primary min-h-5 w-full flex justify-between [@media(min-width:890px)]:justify-end px-4 fixed [@media(min-width:890px)]:static"
      style={{ gap: "clamp(20px, 1.5vw, 80px)" }}
    >
      <Logo isMobileView={true} size={LogoSize.SMALL} />
      <ul
        className="text-white items-center hidden [@media(min-width:890px)]:flex"
        style={{ gap: "clamp(15px, 1.5vw, 40px)" }}
      >
        {topHeaderMenuList.map((item, index) => (
          <li key={item.link}>
            <Link href={item.link} key={index} target="_blank">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <section className="flex items-center gap-7">
        <SearchWidget />
        <ChangeLocale />
        <BurgerMenu />
      </section>
    </section>
  );
};
