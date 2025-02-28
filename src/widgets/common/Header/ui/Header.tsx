"use client";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useNavigationList } from "@/entities/navigation";
import { ChangeLocale } from "@/features";
import { INavigation } from "@/shared/types/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";

import { BurgerMenu } from "../../BurgerMenu/BurgerMenu";
import { SearchWidget } from "../../search-widget/search-widget";

export function Header() {
  const { data: navigations } = useNavigationList();
  const lang = useParams().locale as string;

  return (
    <header className="bg-abu_primary  p-4 ">
      <div className="container flex flex-col items-center gap-10 sm:flex-row sm:justify-end sm:gap-32">
        <h1 className="order-2 sm:order-1 sm:text-md text-center sm:text-left lg:text-lg text-white font-bold">
          «АБАЙ ОБЛЫСЫНЫҢ ЕҢБЕК МОБИЛЬДІЛІГІ ОРТАЛЫҒЫ» КММ
          <br />
          КГУ «ЦЕНТР ТРУДОВОЙ МОБИЛЬНОСТИ ОБЛАСТИ АБАЙ»
        </h1>
        <div className="order-1 sm:order-2 flex gap-5 items-center">
          <div className="w-16 h-16 relative">
            <Image src="/enbek/enbek.png" fill objectFit="contain" alt="EMO" />
          </div>
          <div className="w-36 h-20 relative">
            <Image
              src="/enbek/oblysy.png"
              fill
              objectFit="contain"
              alt="Abai oblysy"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-4 container flex w-full  items-center text-white ">
        <div className="flex flex-1  items-center gap-4">
          <nav
            className={clsx(
              "flex gap-6 items-center [@media(max-width:890px)]:hidden"
            )}
          >
            {navigations?.map((item) => (
              <NavigationItem key={item.id} item={item} lang={lang} />
            ))}
          </nav>
          <BurgerMenu />
        </div>

        {/* Right side controls */}
        <div className="flex gap-4 items-center">
          <ChangeLocale />
          <SearchWidget />
        </div>
      </div>
    </header>
  );
}

function NavigationItem({
  item,
  lang,
  parent_slug,
  isParent,
}: {
  item: INavigation;
  lang: any;
  parent_slug?: string;
  isParent?: boolean;
}) {
  const slug = parent_slug ? `${parent_slug}/${item.slug}` : item.slug;
  if (item.navigation_type === "group") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex items-center gap-2 justify-between text-nowrap">
          {item.title[lang]} <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={isParent ? "right" : "bottom"}
          sideOffset={isParent ? 20 : 30}
        >
          {item.children.map((child) => (
            <DropdownMenuItem>
              <NavigationItem
                key={child.id}
                item={child}
                lang={lang}
                parent_slug={slug}
                isParent={true}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (item.navigation_type === "link") {
    return (
      <Link
        href={item.slug}
        className="text-nowrap block w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title[lang]}
      </Link>
    );
  }
  return <Link className="text-nowrap block w-full" href={`/${lang}/${slug}`}>{item.title[lang]}</Link>;
}
