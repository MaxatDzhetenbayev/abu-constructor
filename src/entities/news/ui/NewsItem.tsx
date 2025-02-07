import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LocaleType } from "@/i18n";
import { backendImageUrl } from "@/shared/lib/constants";

import { INews } from "../model/types";

export const NewsItem = ({
  item,
  locale,
}: {
  item: INews;
  locale: LocaleType[number];
}) => {
  const title = item.title[locale];
  const { description, images } = item.content[locale];

  return (
    <Link href={`news/${item.id}`} tabIndex={0} key={item.id}>
      <div className="relative bg-slate-100 w-full h-[260px] rounded-2xl overflow-hidden">
        <Image
          alt={title}
          fill
          src={`${backendImageUrl}${images?.[0]}`}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <p className="font-raleway">
        {item.createdAt &&
          new Intl.DateTimeFormat(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(item.createdAt))}
      </p>
      <h2 className="text-calc-md text-abu_primary font-bold font-montserrat line-clamp-1 ">
        {title}
      </h2>
      <p
        className="text-[#3E3232] text-calc-md mt-3 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>
    </Link>
  );
};
