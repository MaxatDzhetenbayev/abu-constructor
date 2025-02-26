"use client"
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useNavigationList } from "@/entities/navigation";
import { ChangeLocale } from "@/features";
import { INavigation } from "@/shared/types/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui";

import { BurgerMenu } from "../../BurgerMenu/BurgerMenu";
import { SearchWidget } from "../../search-widget/search-widget";



export function Header() {

  const { data: navigations, } = useNavigationList();
  const lang = useParams().locale as string;

  return (
    <header className=" bg-abu_primary  p-4 ">
      <div className="container flex w-full  items-center text-white ">
        <div className="flex flex-1  items-center gap-4">
          <nav className={clsx("flex gap-6 items-center [@media(max-width:890px)]:hidden")}>
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

function NavigationItem({ item, lang, parent_slug, isParent }: { item: INavigation; lang: any, parent_slug?: string, isParent?: boolean }) {
  const slug = parent_slug ? `${parent_slug}/${item.slug}` : item.slug;
  if (item.navigation_type === "group") {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger className="w-full flex items-center justify-between">{item.title[lang]} <ChevronDownIcon /></DropdownMenuTrigger>
        <DropdownMenuContent side={isParent ? "right" : "bottom"} sideOffset={isParent ? 20 : 30}>
          {item.children.map((child) => (
            <DropdownMenuItem>
              <NavigationItem key={child.id} item={child} lang={lang} parent_slug={slug} isParent={true} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu >

    );
  }
  if (item.navigation_type === "link") {
    return (
      <a href={item.slug} className="text-nowrap" target="_blank" rel="noopener noreferrer">
        {item.title[lang]}
      </a>
    );
  }
  return <Link href={`/${lang}/${slug}`}>{item.title[lang]}</Link>;
}
