"use client";
import { useParams } from "next/navigation";
import React from "react";

import { NewsItem, useNews } from "@/entities/news";
import { LocaleType } from "@/i18n";

export const LastNews = () => {
  const { data } = useNews({ limit: 6, offset: 0 });
  const locale = useParams().locale as LocaleType[number];
  const slug = useParams().slug[0]


  return slug == "home" && (
    <section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4 min-h-[860px]">
        {data?.items?.map((item, index) => {

          if (index === 0) {
            return <NewsItem key={item.id} item={item} locale={locale} styles="h-[320px] sm:h-full sm:col-span-1 lg:col-span-2 lg:row-span-2 h-full" />
          }
          return (
            <NewsItem key={item.id} item={item} locale={locale} styles="h-[320px] sm:h-full sm:col-span-1 lg:col-span-1" />
          )
        })}
      </section>
    </section >
  );
};
