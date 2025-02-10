import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { Container, Heading } from "@/shared/ui";

export const Footer = () => {
  const locale = useParams().locale;

  const t = useTranslations("home");
  const socials = [
    {
      image: "/vk.png",
      link: "https://vk.com/id450108918"
    },
    {
      image: "inst.png",
      link: "https://www.instagram.com/bokeikhan_university/"
    },
    {
      image: "fb.png",
      link: "https://www.facebook.com/bokeikhan.university"
    },
    {
      image: "yt.png",
      link: "https://www.youtube.com/c/AlikhanBokeikhanUniversity"
    },
    {
      image: "in.png",
      link: "https://kz.linkedin.com/company/bokeikhan-university"
    }
  ];

  return (
    <Container>
      <div className="flex gap-5 items-center mb-[3.938rem] justify-center md:justify-end">
        <Heading className="md:mb-0 text-font_primary">
          {t("accreditation&Recognition.title")}
        </Heading>
        <img
          src="/icons/accre.png"
          className="w-[6rem] md:w-[10.375rem] h-auto"
        />
        <Link href="https://greenmetric.ui.ac.id/rankings/overall-rankings-2024" target="_blank">
          <img
            src="/icons/green_metrics.png"
            className="w-[6rem] md:w-[10.375rem] h-auto"
          />
        </Link>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
        {getMap({ locale: locale as string })}
        <div className="flex flex-col gap-5">
          <div className="bg-abu_primary rounded-md text-font_primary p-10 flex flex-col gap-4 text-2xl min-h-[216px]">
            <h3 className="text-4xl font-bold">{t("contacts.our")}</h3>
            <a href="tel:+77222423224">+7 (7222) 42-32-24</a>
            <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
            <h3 className="text-4xl font-bold">{t("contacts.admissions")}</h3>
            <a href="tel:+77222423224">+7 (7222) 44-24-56</a>
            <a href="tel:+77222423224">+7 (700) 643 43 56</a>
          </div>
          <div className="bg-abu_primary rounded-md text-font_primary p-10 min-h-[216px]">
            <h3 className="text-4xl mb-[35px] font-bold">
              {t("contacts.social")}
            </h3>
            <div className="flex gap-2">
              {socials.map(({ image, link }) => (
                <Link key={link} href={link} target="_blank">
                  <img

                    src={`/icons/${image}`}
                    className="w-[46px] h-[46px]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const getMap = ({ locale }: { locale: string }) => {
  if (locale == "ru" || locale == "kz") {
    return <TwoGisMap />;
  }
  return (
    <iframe
      className="w-full h-full rounded-md"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.8354972776897!2d80.24475957676113!3d50.40690329049805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f2653b6778ca47%3A0xc602e68a1b22b35e!2zQWxpa2hhbiBCb2tlaWtoYW4gVW5pdmVyc2l0eSAo05jQu9C40YXQsNC9INCR06nQutC10LnRhdCw0L3QvtCyINGD0L3QuNCy0LXRgNGB0LjRgtC10YLRlik!5e0!3m2!1sru!2skz!4v1730443037797!5m2!1sru!2skz"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
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
    <div>
      <Script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" />
      <Script id="map-script" src="/map.js" strategy="beforeInteractive" />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          display: "block",
        }}
      ></div>
    </div>
  );
};
