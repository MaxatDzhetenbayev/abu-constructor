"use client";
import { useTranslations } from "next-intl";

import { Container, Heading } from "@/shared/ui";

const ielts = [
  { img: "/icons/ielts-1.jpg", link: "https://ielts.kz/" },
  { img: "/icons/ielts-2.jpg", link: "https://ielts.idp.com/book" },
  {
    img: "/icons/ielts-3.jpg",
    link: "https://circulec.tguk.tj/view_article.php?id=15",
  },
];
export const IELTS = () => {
  const t = useTranslations("home");

  return (
    <Container>
      <Heading>{t("ielts.project")}</Heading>
      <section className="mt-4 flex flex-col items-center lg:flex-row md:justify-center gap-10">
        {ielts.map((i) => (
          <a
            href={i.link}
            target="_blank"
            key={i.link}
            className="flex-1 w-full"
          >
            <img src={i.img} alt="ielts" className="" />
          </a>
        ))}
      </section>
    </Container>
  );
};
