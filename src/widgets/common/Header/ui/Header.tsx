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
      <div className="container flex justify-between items-center text-white ">
        <div className="flex items-center gap-4">

          <nav className={clsx("flex gap-6 [@media(max-width:890px)]:hidden")}>
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

function NavigationItem({ item, lang, parent_slug }: { item: INavigation; lang: any, parent_slug?: string }) {
  const slug = parent_slug ? `${parent_slug}/${item.slug}` : item.slug;
  if (item.navigation_type === "group") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2">{item.title[lang]} <ChevronDownIcon /></DropdownMenuTrigger>
        <DropdownMenuContent>
          {item.children.map((child) => (
            <DropdownMenuItem>
              <NavigationItem key={child.id} item={child} lang={lang} parent_slug={slug} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu >

    );
  }
  if (item.navigation_type === "link") {
    return (
      <a href={item.slug} target="_blank" rel="noopener noreferrer">
        {item.title[lang]}
      </a>
    );
  }
  return <Link href={`/${lang}/${slug}`}>{item.title[lang]}</Link>;
}
