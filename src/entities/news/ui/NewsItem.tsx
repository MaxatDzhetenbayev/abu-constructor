import clsx from "clsx";
import dayjs from 'dayjs'
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LocaleType } from "@/i18n";
import { backendImageUrl } from "@/shared/lib/constants";

import 'dayjs/locale/kk'
import 'dayjs/locale/ru'
import { INews } from "../types/types";

export const NewsItem = ({
  item,
  locale,
  styles
}: {
  item: INews;
  styles?: string;
  locale: LocaleType[number];
}) => {
  const title = item.title[locale];
  const { description, images } = item.content[locale];

  return (
    <Link href={`news/${item.id}`} tabIndex={0} key={item.id} className={clsx(styles, "flex flex-col")}>
      <div className={clsx(
        "relative bg-slate-100 w-full rounded-md overflow-hidden flex-1",
      )}>
        <Image
          alt={title}
          fill
          src={`${backendImageUrl}${images?.[0]}`}
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="mt-2" >
        <p className="font-raleway">
          {item.createdAt &&
            <span className="capitalize">{dayjs(item.createdAt).locale(locale === "kz" ? "kk" : locale).format("dddd, D MMMM, YYYY")}</span>
          }
        </p>
        <h2 className="text-calc-md text-abu_primary font-bold font-montserrat line-clamp-1">
          {title}
        </h2>
        <p
          className="text-[#3E3232] text-calc-md line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></p>
      </div>
    </Link>
  );
};
