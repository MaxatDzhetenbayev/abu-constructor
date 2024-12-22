import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { Container, Heading } from "@/shared/ui";

const news = [
  {
    text: "Диагностика профессорско-преподавательского состава Alikhan Bokeikhan University",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-2.jpeg",
  },
  {
    text: "Семестровое обучение в Indian Institute of Technology Bombay",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-3.jpeg",
  },
  {
    text: "Региональная студенческая олимпиада «Финансовая безопасность»",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-4.jpeg",
  },
];

export const News = () => {
  const t = useTranslations("home");

  return (
    <Container className="w-full ">
      <Heading>{t("news.title")}</Heading>
      <section className="w-full flex flex-col gap-4">
        {/* <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-5">
			 <Card key={news[0].desc} {...news[0]} />
			 <Events />
		  </section> */}
        <section className="flex gap-4 max-lg:flex-col">
          {news.slice(0, 3).map((card) => (
            <Card key={card.text} {...card} />
          ))}
        </section>
        <MoreButton maxWidth="506px" link="news" />
      </section>
    </Container>
  );
};

type SLcard = {
  img: string;
  desc: string;
  text: string;
};

const Card = ({
  img,
  desc,
  text,
  className,
}: SLcard & { className?: string }) => {
  return (
    <article
      className={clsx(
        "py-4 px-5 grow basis-1 border flex flex-col gap-[.9rem] border-slate-200 rounded-md",
        className
      )}
    >
      <div className="relative  aspect-square md:max-h-[380px] lg:max-h-[320px]">
        <Image src={img} fill alt={text} className="object-cover" />
      </div>
      <div className="">
        <h2 className="text-abu_primary font-semibold text-calc-xl">{text}</h2>
        <p className="text-[#3E3232] text-calc-md mt-3">{desc}</p>
      </div>
    </article>
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
      className="flex py-3 w-full justify-center items-center rounded-lg bg-abu_primary gap-2"
      style={{
        maxWidth,
      }}
    >
      <span className="text-2xl text-white font-bold">{t("more")}</span>
      <ArrowRight color="white" />
    </Link>
  );
};
