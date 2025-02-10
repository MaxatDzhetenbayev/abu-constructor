"use client";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import { useNews } from "@/entities/news";
import { INews } from "@/entities/news/types/types";
import { LocaleType } from "@/i18n";
import { backendImageUrl } from "@/shared/lib/constants";
import { Container, Heading, Skeleton } from "@/shared/ui";

export const News = () => {
  const t = useTranslations("home");

  const { data, isLoading } = useNews({ limit: 3 });
  const skeletonNews = Array.from({ length: 3 }).fill(1);
  return (
    <Container className="w-full ">
      <Heading className="text-font_primary">{t("news.title")}</Heading>
      <section className="w-full flex flex-col gap-4">
        {/* <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-5">
			 <Card key={news[0].desc} {...news[0]} />
			 <Events />
		  </section> */}
        {isLoading ? (
          <section>
            {skeletonNews.map((item, idx) => (
              <article key={idx}>
                <Skeleton className="w-full h-[260px]" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[50px] mt-5" />
              </article>
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-3 gap-4 max-lg:flex max-lg:flex-col">
            {data?.items?.map((card) => <Card key={card.id} {...card} />)}
          </section>
        )}
        <MoreButton maxWidth="506px" link="news" />
      </section>
    </Container>
  );
};

const Card = ({
  content,
  title,
  id,
  className,
}: INews & { className?: string }) => {
  const locale = useParams().locale as LocaleType[number];

  const head = title[locale];
  const { description, images } = content[locale];

  return (
    <Link href={`news/${id}`}>
      <article
        className={clsx(
          "py-4 px-5 grow basis-1 border flex flex-col gap-[.9rem] border-slate-200 rounded-md",
          className
        )}
      >
        <div className="relative  aspect-square md:max-h-[380px] lg:max-h-[320px]">
          <Image
            src={`${backendImageUrl}${images?.[0]}`}
            fill
            alt={head}
            className="object-cover"
          />
        </div>
        <div className="">
          <h2 className="text-font_primary font-semibold text-calc-xl">{head}</h2>
          <p className="text-font_primary text-calc-md mt-3">{description.length > 80 ? description.slice(0, 75) + "..." : description}</p>
        </div>
      </article>
    </Link>
  );
};
const MoreButton = ({
  maxWidth,
  link,
}: {
  maxWidth?: string;
  link: string;
}) => {
  const t = useTranslations();

  return (
    <Link
      href={`${link}`}
      className="flex py-3 w-full justify-center items-center rounded-lg bg-[#000] gap-2"
      style={{
        maxWidth,
      }}
    >
      <span className="text-2xl text-white font-bold">{t("more")}</span>
      <ArrowRight color="white" />
    </Link>
  );
};
