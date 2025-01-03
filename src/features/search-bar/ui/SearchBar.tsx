"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { LocaleType } from "@/i18n";
import { Input } from "@/shared/ui";
import { Badge } from "@/shared/ui/badge";

import { useSearch } from "../model/useSearch";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const locale = useParams().locale as LocaleType[number];
  const t = useTranslations("search");

  const { data, isLoading } = useSearch(query, locale);

  return (
    <section>
      <Input
        placeholder="Напишите для поиска по сайту"
        className="w-full active:ring-0 active:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-6">
          {data?.map((item: any) => {
            return (
              <li key={item.id} className="border border-gray-200">
                <Link
                  href={`/${locale}/${item.slug}`}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                >
                  <span className="flex flex-col gap-1">
                    <p className="text-[14px]">{item.all_title}</p>
                    <h3 className="">{item.title}</h3>
                  </span>
                  <Badge variant="outline">{t(item.type)}</Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
