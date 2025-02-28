"use client";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import { NewsItem, useNews } from "@/entities/news";
import { LocaleType } from "@/i18n";

export const LastNews = () => {
  const t = useTranslations();
  const { data } = useNews({ limit: 6, offset: 0 });
  const locale = useParams().locale as LocaleType[number];
  const slug = useParams().slug[0]


  return slug == "home" && (
    <section>
      <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-[860px]">
        {data?.items?.map((item, index) => {

          if (index === 0) {
            return <NewsItem key={item.id} item={item} locale={locale} styles="block col-span-2 row-span-2 h-full" />
          }
          return (
            <NewsItem key={item.id} item={item} locale={locale} />
          )
        })}
      </section>
    </section >
  );
};
