import React from "react";

import { Logo, LogoSize } from "@/entities";
import { ChangeLocale } from "@/features";
import { BurgerMenu, SearchWidget } from "@/widgets";

import { TopHeaderMenu } from "./TopHeaderMenu";

export const TopHeader = () => {
  return (
    <section
      className="bg-[#640000] min-h-5 w-full flex justify-between [@media(min-width:890px)]:justify-end px-4 fixed [@media(min-width:890px)]:static"
      style={{ gap: "clamp(20px, 1.5vw, 80px)" }}
    >
      <Logo isMobileView={true} size={LogoSize.SMALL} />
      <TopHeaderMenu />
      <section className="flex items-center gap-7">
        <SearchWidget />
        <ChangeLocale />
        <BurgerMenu />
      </section>
    </section>
  );
};
