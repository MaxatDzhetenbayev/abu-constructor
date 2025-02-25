"use client";
import clsx from "clsx";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { backendUrl } from "@/shared/lib/constants";
import { INavigation } from "@/shared/types";
import { Button, Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui";

import { useQuery } from "@tanstack/react-query";

export const BurgerMenu = () => {
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
        className="flex text-white  justify-center items-center [@media(min-width:890px)]:hidden "
        onClick={() => setOpen(true)}
      >
        <Menu size={32} />
      </Button>
      <DrawerContent className="rounded-none bg-abu_primary border-none px-4 py-14">
        <div className="relative flex flex-col gap-3 text-xl text-white">
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            size={"icon"}
            className="absolute z-50 -right-3 -top-10"
          >
            <X />
          </Button>
          {Array.isArray(pages) &&
            pages.map((p) => (
              <MenuLink key={p.id} page={p} locale={params.locale as string} />
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

  if (page?.navigation_type === "link") {
    return (
      <a href={page.slug} target="_blank" rel="noopener noreferrer">
        {page.title[locale]}
      </a>
    );
  }
  if (page?.children?.length === 0 || page?.navigation_type === "content") {
    return (
      <Link
        className={clsx(path == `/${locale}/${route}` && "font-bold")}
        href={`/${locale}/${route}`}
      >
        {page.title[locale]}
      </Link>
    );
  } else if (page?.navigation_type === "group") {
    return (
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger className="text-start flex justify-start items-center gap-3">
          {page.title[locale]} <ChevronRight className="" />
        </DrawerTrigger>
        <DrawerContent className="rounded-none bg-abu_primary   border-none px-4 py-14">
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
