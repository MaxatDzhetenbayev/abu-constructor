"use client"
import { useParams } from "next/navigation";
import React from "react";

import { NewsItem, useNews } from "@/entities/news";
import { LocaleType } from "@/i18n";


export const LastNews = () => {


  const { data } = useNews({ limit: 3, offset: 0 });
  const locale = useParams().locale as LocaleType[number];

  return (
    <section>
      <h2 className="text-xl mb-4 text-center">Последние новости</h2>
      <section className="flex flex-col gap-4">
        {
          data?.items?.map((item) => (
            <NewsItem key={item.id} item={item} locale={locale} />
          ))
        }
      </section>
    </section>
  );
};
