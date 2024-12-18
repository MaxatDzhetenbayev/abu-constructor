import { Container, Heading } from "@/shared/ui";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

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
              className="flex items-center relative h-[5.75rem] md:h-[10.75rem] rounded-md px-2.5 w-[17.875rem] bg-abu_primary "
            >
              <span className="text-white font-bold text-calc-xl">
                {t(`infographics.${idx + 1}`)}
              </span>
              <Image
                className={clsx(
                  "absolute left-1/2 -bottom-10   h-auto",
                  {
                    1: "w-[9.188rem]",
                    2: "w-[5.688rem]",
                    3: "w-[8.25rem]",
                    4: "w-[10.5rem]",
                    5: "w-[10.375rem]",
                  }[idx + 1]
                )}
                src={`/infograph/${idx + 1}.svg`}
                alt={`index-${idx + 1}`}
                width={100}
                height={100}
              />
            </section>
          ))}
      </section>
    </Container>
  );
};
