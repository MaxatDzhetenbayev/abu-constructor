"use client";
import clsx from "clsx";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

import { topHeaderMenuList } from "@/shared/config/topHeaderMenu";
import { backendUrl } from "@/shared/lib/constants";
import { INavigation } from "@/shared/types";
import { Button, Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui";

import { ChangeLocale } from "@/features";
import { useQuery } from "@tanstack/react-query";

export const BurgerMenu = () => {
    const t = useTranslations()
    const params = useParams();

    const { data: pages } = useQuery<INavigation[]>({
        queryKey: ["navigations"],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/navigations`);
            return response.json();
        },
        refetchOnWindowFocus: false,
    });
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <Button
                size={"icon"}
                variant={"ghost"}
                className="flex text-white hover:text-bg-[#67493E] justify-center items-center [@media(min-width:890px)]:hidden "
                onClick={() => setOpen(true)}
            >
                <Menu size={32} color="#67493E" />
            </Button>
            <DrawerContent className="rounded-none bg-[#67493E] border-none px-4 py-4">
                <div className="relative flex flex-col gap-3 text-xl text-white">
                    <section className="flex justify-between items-center">

                        <ChangeLocale className="text-white" />
                        <Button
                            onClick={() => setOpen(false)}
                            variant={"ghost"}
                            size={"icon"}
                            className=""
                        >
                            <X />
                        </Button>
                    </section>
                    {Array.isArray(pages) &&
                        pages.map((p) => (
                            <MenuLink key={p.id} page={p} locale={params.locale as string} />
                        ))}
                </div>
                <div className="w-full h-[2px] bg-white my-6"></div>
                <div className="flex flex-col gap-2">
                    {topHeaderMenuList.map((item, index) => (
                        <Link
                            href={item.link}
                            key={index}
                            className="text-white text-[20px]"
                        >
                            {index == 0 ? t(item.title) : item.title}
                        </Link>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const MenuLink = ({
    page,
    locale,
    parentRoute,
}: {
    page: INavigation;
    locale: string;
    parentRoute?: string | null;
}) => {
    const path = usePathname();
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const [route] = useState(
        () => `${parentRoute ? `${parentRoute}/` : ""}${page.slug}`
    );

    if (page?.children?.length === 0 || page?.navigation_type === "content") {
        return (
            <Link
                className={clsx(path == `/${locale}/${route}` && "font-bold")}
                href={`/${locale}/${route}`}
            >
                {page.title[locale]}
            </Link>
        );
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen} direction="right">
                <DrawerTrigger className="text-start flex justify-start items-center gap-3">
                    {page.title[locale]} <ChevronRight className="" />
                </DrawerTrigger>
                <DrawerContent className="rounded-none bg-[#67493E]   border-none px-4 py-14">
                    <div className=" relative flex flex-col gap-3 text-xl text-white ">
                        <Button
                            onClick={() => setOpen(false)}
                            variant={"ghost"}
                            size={"sm"}
                            className="absolute z-50 -left-3 -top-10 flex gap-2 items-center justify-center"
                        >
                            <ArrowLeft />
                            <span className="text-lg">{t("burger.back")}</span>
                        </Button>
                        {page.children &&
                            page.children.map((p) => (
                                <MenuLink
                                    key={p.id}
                                    page={p}
                                    locale={locale}
                                    parentRoute={route}
                                />
                            ))}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }
};
