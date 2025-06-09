import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

import { Container, Heading } from "@/shared/ui";

export const Infographics = () => {
  const t = useTranslations("home");

  return (
    <Container>
      <Heading className="mb-4 md:mb-8 text-center text-[#67493E] text-calc-2xl">
        <>{t("infographics.title")}</>
      </Heading>
      <section className="flex flex-wrap justify-center box-border gap-10">
        {Array.from({ length: 5 })
          .fill(1)
          .map((s, idx) => {
            return (
              <div
                key={idx}
                className={`mb-4 relative rounded-3xl p-[2px] bg-white border bg-gradient-to-tr from-[#67493E] to-[#FFBE0B] `}
              >
                <div className="bg-white rounded-[22px] p-6">
                  <div className="relative w-24 h-24 bg-[#FDF3DF] p-4 rounded-full flex items-center justify-center mx-auto">
                    <Image
                      src={`/infograph/${idx + 1}.svg`}
                      alt={`index-${idx + 1}`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                  <p className="text-center text-calc-xl font-semibold text-gray-800">
                    50+ білім беру бағдарламасы
                  </p>
                </div>
              </div>
            );
          })}
      </section>
    </Container>
  );
};
