import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { ComponentProps } from "react";

import { ChangeLocale, LogoutButton } from "@/features";

import { Navlink } from "./Navlink";

const links = [
  // { label: "links.home.label", href: "links.home.href" },
  // { label: "links.settings.label", href: "links.settings.href" },
  { label: "links.pages.label", href: "links.pages.href" },
  { label: "links.news.label", href: "links.news.href" },
];
export const AdminSidebar = async ({
  className,
  ...props
}: ComponentProps<"nav">) => {
  const t = await getTranslations("sidebar");

  return (
    <nav
      className={clsx(
        className,
        "flex z-10 items-center md:items-start md:static flex-row md:flex-col fixed left-0 right-0 h-20 justify-center md:justify-between gap-3 bg-[#690000] text-white p-10 md:h-full"
      )}
      {...props}
    >
      <ChangeLocale />
      <div className="flex flex-row md:flex-col gap-3">
        {links.map((key) => (
          <Navlink key={key.href} href={t(`${key.href}`)}>
            {t(`${key.label}`)}
          </Navlink>
        ))}
      </div>
      <LogoutButton />
    </nav>
  );
};
