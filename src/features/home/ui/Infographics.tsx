import { useTranslations } from "next-intl";
import React from "react";

import { Container, Heading } from "@/shared/ui";

export const Infographics = () => {
  const t = useTranslations("home");

  return (
    <Container>
      <Heading className="mb-4 md:mb-8">
        <>{t("infographics.title")}</>
      </Heading>
      <section className="flex justify-center flex-wrap xl:flex-nowrap gap-2   md:gap-5  rounded-md ">
        {Array.from({ length: 5 })
          .fill(1)
          .map((s, idx) => (
            <section
              key={idx}
              className="flex items-center relative h-[5.75rem] md:h-[10.75rem] rounded-md px-2.5 w-[17.875rem] bg-[#CFCFD11F] "
            >
              <span className="text-abu_primary font-bold text-calc-xl">
                {t(`infographics.${idx + 1}`)}
              </span>
            </section>
          ))}
      </section>
    </Container>
  );
};
