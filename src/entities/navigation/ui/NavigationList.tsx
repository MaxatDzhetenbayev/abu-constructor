"use client";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { INavigation } from "@/shared/types/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Skeleton,
} from "@/shared/ui";

import { useNavigationList } from "../api/useNavigationList";

// interface INavListProps {
//   hoveredItem: number | null;
//   setHoveredItem: (id: number | null) => void;
// }
export const NavigationList = () =>
// 	{
//   hoveredItem,
//   setHoveredItem,
// }: INavListProps
{
    const { data: navigations, isFetching } = useNavigationList();
    const locale = useParams().locale as string;

    //   const handleMouseEnter = (id: number) => {
    //     setHoveredItem(id);
    //   };

    //   const handleMouseLeave = () => {
    //     setHoveredItem(null);
    //   };
    return (
        <div className="flex-1">
            {isFetching ? (
                <div className="w-[600px] grid place-items-center h-[5.875rem]">
                    <Skeleton className="w-full h-[2rem]" />
                </div>
            ) : navigations ? (
                <ul className="flex gap-4">
                    <NavList lvl={0} pages={navigations} locale={locale} />
                </ul>
            ) : (
                <span>Навигация не найдена</span>
            )}
        </div>
    );
};

const NavList = ({
    pages,
    locale,
    lvl,
    parentSlug
}: {
    pages: INavigation[];
    locale: string | string[];
    lvl: number;
    parentSlug?: string
}) => {
    const path = usePathname();
    let fullParentSlug = parentSlug ? "/" + parentSlug : ""
    return pages.map((page) => {
        if (page.children.length === 0) {
            return (
                <Link
                    className={clsx(
                        "text-left px-4  p-1 rounded-md text-white bg-enbek_primary",
                        path == `/${locale}${fullParentSlug}/${page.slug}` && "font-bold"
                    )}
                    href={`/${locale}${fullParentSlug}/${page.slug}`}
                    key={page.id}
                >
                    {page.title[locale as string]}
                </Link>
            );
        } else {
            return (
                <DropdownMenu key={page.id}>
                    <DropdownMenuTrigger asChild>
                        <div className="p-1 cursor-pointer  rounded-md flex gap-2 items-center  text-center text-white justify-normal ">
                            <span className="ml-2    lg:ml-5">
                                {page.title[locale as string]}
                            </span>
                            <ChevronRight className={clsx("transition rotate-90 mt-1")} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={lvl == 0 ? "bottom" : "right"}
                        align="start"
                        className="flex flex-col gap-3  text-white bg-enbek_primary py-2 border-1  border-enbek_primary_active"
                    >
                        <NavList lvl={lvl + 1} locale={locale} pages={page.children} parentSlug={page.slug} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    });
};
