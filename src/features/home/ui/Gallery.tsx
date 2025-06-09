import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Heading } from "@/shared/ui";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export const Gallery = () => {
  const t = useTranslations();
  const locale = useParams().locale;

  const gallery_items = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <section className="max-w-[1500px] font-raleway px-3  w-full mx-auto">
      <Heading>{t("home.gallery.title")}</Heading>
      <section className="grid grid-cols-1 lg:grid-cols-[566px,1fr] gap-3">
        <section className="flex flex-col max-lg:order-2 max-lg:text-justify  gap-10">
          <p>{t("home.gallery.body")}</p>
          <Link
            href={`/${locale}/university/media_resources`}
            className="flex py-3 w-full justify-center items-center rounded-lg bg-[#67493E] gap-2 text-white text-3xl"
          >
            {t("more")}
            <ArrowRight color="white" />
          </Link>
        </section>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop
          initialSlide={2}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 150,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="gallery-swiper pt-0"
        >
          {gallery_items.map((i) => (
            <SwiperSlide key={i} className="gallery-swiper-slide">
              <div className="block   relative h-[460px]">
                <Image
                  fill
                  objectFit="cover"
                  alt={String(i)}
                  src={`/icons/gallery/gallery${i}.jpeg`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};
