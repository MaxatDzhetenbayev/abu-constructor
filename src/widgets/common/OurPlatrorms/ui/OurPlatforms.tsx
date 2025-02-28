"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

export const OurPlatforms = () => {
  const t = useTranslations();
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold ">{t("our_platforms")}</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4 ">
        <article>
          <Link
            href=""
            className="bg-[#F7F2FE] p-6 flex flex-col gap-5"
            tabIndex={0}
          >
            <div className="relative w-full h-28">
              <Image
                src="/images/our_platform/skills.png"
                fill
                objectFit="contain"
                alt="Enbek skills"
              />
            </div>
            <p className="text-md">
              Жаңа дағдыларды үйрету және мансапты іске қосу мүмкіндігі
            </p>
          </Link>
        </article>
        <article>
          <Link
            href=""
            className="bg-[#F2F6FF] p-6 flex flex-col gap-5"
            tabIndex={0}
          >
            <div className="relative w-full h-28">
              <Image
                src="/images/our_platform/business.png"
                fill
                objectFit="contain"
                alt="Enbek skills"
              />
            </div>
            <p className="text-md">
              Жаңа дағдыларды үйрету және мансапты іске қосу мүмкіндігі
            </p>
          </Link>
        </article>
        <article>
          <Link
            href=""
            className="bg-[#EFFCF5] p-6 flex flex-col gap-5"
            tabIndex={0}
          >
            <div className="relative w-full h-28">
              <Image
                src="/images/our_platform/hr.png"
                fill
                objectFit="contain"
                alt="Enbek skills"
              />
            </div>
            <p className="text-md">
              Жаңа дағдыларды үйрету және мансапты іске қосу мүмкіндігі
            </p>
          </Link>
        </article>
        <article>
          <Link
            href=""
            className="bg-[#FBEEED] p-6 flex flex-col gap-5"
            tabIndex={0}
          >
            <div className="relative w-full h-28">
              <Image
                src="/images/our_platform/career.png"
                fill
                objectFit="contain"
                alt="Enbek skills"
              />
            </div>
            <p className="text-md">
              Жаңа дағдыларды үйрету және мансапты іске қосу мүмкіндігі
            </p>
          </Link>
        </article>
      </section>
    </section>
  );
};
