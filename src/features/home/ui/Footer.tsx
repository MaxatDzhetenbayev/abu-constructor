import Link from "next/link";
import Script from "next/script";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { Container, Heading } from "@/shared/ui";

export const Footer = () => {
  const t = useTranslations("home");
  const socials = [
    {
      image: "/vk.png",
      link: "https://vk.com/id450108918",
    },
    {
      image: "inst.png",
      link: "https://www.instagram.com/bokeikhan_university/",
    },
    {
      image: "fb.png",
      link: "https://www.facebook.com/bokeikhan.university",
    },
    {
      image: "yt.png",
      link: "https://www.youtube.com/c/AlikhanBokeikhanUniversity",
    },
    {
      image: "in.png",
      link: "https://kz.linkedin.com/company/bokeikhan-university",
    },
  ];

  return (
    <div>
      <div className="flex gap-5 items-center mb-[3.938rem] flex-col md:flex-row justify-center md:justify-end">
        <Container className="flex items-center justify-between w-full">
          <Heading className="md:mb-0">
            {t("accreditation&Recognition.title")}
          </Heading>
          <div className="flex gap-5 items-end">
            <img
              src="/icons/accre.png"
              className="w-[9rem] md:w-[10.375rem] h-auto"
            />
            <Link
              href="https://greenmetric.ui.ac.id/rankings/overall-rankings-2024"
              target="_blank"
            >
              <img
                src="/icons/green_metrics.png"
                className="w-[9rem] md:w-[10.375rem] h-auto"
              />
            </Link>
          </div>
        </Container>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 gap-4 bg-[#67493E]">
        <div className="flex h-full justify-center flex-col pl-10">
          <div className="rounded-md text-white p-4 flex flex-col gap-2 text-2xl ">
            <h3 className="text-2xl font-bold  text-white">
              {t("contacts.our")}
            </h3>
            <a
              className="text-2xl font-bold text-white"
              href="tel:+77222423224"
            >
              +7 (7222) 42-32-24
            </a>
            <a
              className="text-2xl font-bold text-white"
              href="mailto:semey@abu.edu.kz"
            >
              semey@abu.edu.kz
            </a>
            <h3 className="text-2xl font-bold text-white">
              {t("contacts.admissions")}
            </h3>
            <a
              className="text-2xl font-bold text-white"
              href="tel:+77222423224"
            >
              +7 (7222) 44-24-56
            </a>
            <a
              className="text-2xl font-bold text-white"
              href="tel:+77222423224"
            >
              +7 (700) 643 43 56
            </a>
          </div>
          <div className="rounded-md text-white p-4">
            <h3 className="text-2xl mb-[15px] text-white font-bold">
              {t("contacts.social")}
            </h3>
            <div className="flex gap-2">
              {socials.map(({ image, link }) => (
                <Link key={link} href={link} target="_blank">
                  <img src={`/icons/${image}`} className="w-[46px] h-[46px]" />
                </Link>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-white">{t("created_by")}</h3>
          </div>
        </div>
        <TwoGisMap />
      </div>
    </div>
  );
};

const TwoGisMap = () => {
  useEffect(() => {
    const existingScript = document.getElementById("map-script");
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement("script");
    script.id = "map-script";
    script.src = "/map.js"; // Path to your custom script
    script.async = true;

    // Append the new script to the document
    document.body.appendChild(script);

    // Cleanup function to remove the script if component unmounts
    return () => {
      script.remove();
    };
  }, []);
  return (
    <div className="overflow-hidden rounded-tl-full rounded-bl-full">
      <Script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" />
      <Script id="map-script" src="/map.js" strategy="beforeInteractive" />
      <div
        id="map"
        style={{
          width: "100%",
          height: "450px",
          borderRadius: 10,
          display: "block",
        }}
      ></div>
    </div>
  );
};
