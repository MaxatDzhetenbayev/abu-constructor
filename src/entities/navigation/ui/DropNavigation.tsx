"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { INavigation } from "@/shared/types";

interface DropNavigationProps {
    item: INavigation;
    locale: string;
    handleMouseLeave: () => void;
    scrolled: boolean;
}

export const DropNavigation = ({
    handleMouseLeave,
    item,
    locale,
    scrolled,
}: DropNavigationProps) => {
    const path = usePathname();

    return (
        <section
            onMouseLeave={handleMouseLeave}
            className={clsx(
                "absolute left-0  pt-3 w-full bg-enbek_primary px-10 pb-10 ",
                scrolled ? "top-[94px]" : "top-[134px]"
            )}
        >
            <ul className="flex justify-center  gap-[60px]">
                {item.children.map((child) => (
                    <li key={child.id}>
                        {child.navigation_type === "content" ||
                            child.navigation_type === "group-link" ? (
                            <Link
                                href={`/${locale}/${item.slug}/${child.slug}`}
                                className={clsx(
                                    "text-white font-bold hover:underline duration-150",
                                    path == `/${locale}${child.slug}` && "font-bold"
                                )}
                                style={{
                                    fontSize: "clamp(18px, 1.4vw, 24px)",
                                }}
                            >
                                {child.title[locale]}
                            </Link>
                        ) : (
                            <>
                                {child.title[locale] != "Образование" && (
                                    <h2 className="text-white font-bold text-[24px]">
                                        {child.title[locale]}
                                    </h2>
                                )}
                            </>
                        )}
                        {child.children.length > 0 && (
                            <ul className="mt-4 flex flex-col gap-3">
                                {child.children.map((subChild) => (
                                    <li key={subChild.id} className="max-w-[400px]">
                                        <Link
                                            href={`/${locale}/${item.slug}/${child.slug}/${subChild.slug}`}
                                            className={clsx(
                                                "text-center max-w-11 text-slate-200 leading-3 hover:underline duration-150"
                                            )}
                                            style={{
                                                fontSize: "clamp(16px, 1.5vw, 20px)",
                                            }}
                                        >
                                            {subChild.title[locale]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};
