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
        placeholder="Напишите для поиска"
        className="w-48"
        label=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data?.map((item: any) => {
            console.log(item);
            return (
              <li key={item.id}>
                <Link
                  href={`/${locale}/${item.slug}`}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                >
                  <span className="flex flex-col gap-1">
                    <p className="text-[12px]">{item.all_title}</p>
                    <h3 className="quill-content ql-size-large">
                      {item.title}
                    </h3>
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
