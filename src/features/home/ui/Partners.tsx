import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container, Heading } from "@/shared/ui";

import "swiper/css";
import "swiper/css/navigation";

export const Partners = () => {
  const t = useTranslations("home.partners");

  const partners = Array(3)
    .fill([
      { name: "ABAI IT VALLEY", img: "/icons/aiv.svg" },
      { name: "ASTANA HUB", img: "/icons/ah.png" },
      { name: "FREEDOM BROKER", img: "/icons/free.png" },
      { name: "HUAWEI", img: "/icons/h.png" },
      { name: "Акимат города Семей", img: "/icons/a.png" },
      { name: "", img: "/icons/partners/1.webp" },
      { name: "", img: "/icons/partners/2.png" },
      { name: "", img: "/icons/partners/3.webp" },
      { name: "", img: "/icons/partners/4.webp" },
      { name: "", img: "/icons/partners/5.webp" },
      { name: "", img: "/icons/partners/6.webp" },
      { name: "", img: "/icons/partners/7.webp" },
      { name: "", img: "/icons/partners/8.webp" },
      { name: "", img: "/icons/partners/9.svg" },
      { name: "", img: "/icons/partners/10.webp" },
      { name: "ТОО «ExpoDamu»", img: "/icons/partners/11.png" },
      {
        name: "SIGEX",
        img: "/icons/partners/12.png",
        link: "https://sigex.kz/",
      },
      {
        name: "INNOVATIVE COLLEGE",
        img: "/icons/partners/13.png",
        link: "https://innovativecollege.kz/",
      },
      {
        name: "SMK",
        img: "/icons/partners/14.png",
        link: "https://smkcollege.kz/glavnaya/",
      },
    ])
    .flat();
  return (
    <section className="py-20">
      <Container className="">
        <Heading className=" font-bold mb-[10px]">{t("title")}</Heading>
        <Swiper
          className="h-[200px] mt-6"
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay]}
        >
          {partners.map((i, idx) => {
            return (
              <SwiperSlide
                key={idx}
                className="flex justify-center flex-col gap-6 items-center"
              >
                {i.link ? (
                  <Link
                    href={i.link}
                    target="_blank"
                    className="w-full h-full relative block"
                  >
                    <Image
                      src={i.img}
                      className="object-contain w-full h-full"
                      fill
                      alt={i.name}
                    />
                  </Link>
                ) : (
                  <div className="w-full h-full relative">
                    <Image
                      src={i.img}
                      className="object-contain w-full h-full"
                      fill
                      alt={i.name}
                    />
                  </div>
                )}
                <h2 className="font-bold text-center text-md md:text-lg lg:text-xl text-abu_primary ">
                  {i.name}
                </h2>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
};
