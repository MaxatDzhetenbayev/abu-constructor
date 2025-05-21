"use client"
import { useTranslations } from "next-intl";

import { Container, Heading } from "@/shared/ui";

const ielts = [
  { img: "/icons/ielts-1.jpg", link: "https://ielts.kz/" },
  { img: "/icons/ielts-2.jpg", link: "https://ielts.idp.com/book" },
];
export const IELTS = () => {
  const t = useTranslations("home");

  return (
    <Container>
      <Heading className="text-center">{t("ielts.exam")}</Heading>
      <section className="mt-4 flex flex-col items-center lg:flex-row md:justify-center gap-10">
        {ielts.map((i) => (
          <a href={i.link} target="_blank" key={i.link}>
            <img className="max-w-[350px] md:max-w-[450px]" src={i.img} alt="ielts" />
          </a>
        ))}
      </section>
    </Container>
  );
};
