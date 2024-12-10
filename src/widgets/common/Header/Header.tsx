"use client";
import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/common/Header/Navbar";
import Image from "next/image";
import Link from "next/link";
import { SearchWidget } from "../SearchWidget/SearchWidget";
import { TopHeader } from "@/entities/top-header";

export const Header = () => {
  return (
    <header className="relative z-50  flex flex-col  w-full">
      <section
        className="bg-abu_primary min-h-5 w-full flex justify-between [@media(min-width:890px)]:justify-end px-4 fixed [@media(min-width:890px)]:static"
        style={{ gap: "clamp(20px, 1.5vw, 80px) " }}
      >
        <Link
          href="/"
          className="inline [@media(min-width:890px)]:hidden"
          style={{ position: "relative", height: "80px", width: "180px" }}
        >
          <Image
            src={`/images/logo-white.png`}
            alt="logo"
            fill
            objectFit="contain"
          />
        </Link>
        <TopHeader />
        <section className="flex items-center gap-7">
          <SearchWidget />
          <ChangeLocale />
          <BurgerMenu  />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
