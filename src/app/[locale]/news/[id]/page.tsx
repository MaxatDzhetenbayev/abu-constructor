"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNewsById, viewPluralWordsCollection } from "@/entities/news";
import { LocaleType } from "@/i18n";
import { useWordPlural } from "@/shared/lib";
import { backendImageUrl } from "@/shared/lib/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Skeleton,
} from "@/shared/ui";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Page({
  params,
}: {
  params: { id: number; locale: LocaleType[number] };
}) {
  const { id, locale } = params;
  const { data, isLoading, isError } = useNewsById(id);

  if (isLoading) {
    return (
      <section>
        <Skeleton className="w-full h-[20px] max-w-[200px]" />
        <Skeleton className="w-full h-[20px] mt-3 max-w-[600px]" />
        <Skeleton className="w-full h-[550px] mt-10" />
        <section className="mt-20">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[20px] mt-3" />
          ))}
        </section>
      </section>
    );
  }

  if (isError || !data || !data.content?.[locale]) {
    return (
      <section>
        <h1>Страница не найдена</h1>
      </section>
    );
  }

  const { description, images } = data.content[locale];
  const { getWord } = useWordPlural(locale);

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-red-950 font-bold text-xl">
            <BreadcrumbLink
              href={`/${locale}/home`}
              style={{
                fontSize: "clamp(18px, 1.4vw, 24px)",
              }}
            >
              Главная
            </BreadcrumbLink>
            <ChevronRight size={30} className="mb-1" />
          </BreadcrumbItem>
          <BreadcrumbItem className="text-red-950 font-bold text-xl">
            <BreadcrumbLink
              href={`/${locale}/news`}
              style={{
                fontSize: "clamp(18px, 1.4vw, 24px)",
              }}
            >
              Новости
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-10">
        {data.createdAt && (
          <span className="font-raleway text-gray-400">
            Создано:{" "}
            {new Intl.DateTimeFormat(locale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(data.createdAt)) + ", "}
          </span>
        )}
        {data.viewCount !== undefined && (
          <span className="font-raleway text-gray-400">
            {data.viewCount}{" "}
            {getWord(data.viewCount, viewPluralWordsCollection)}
          </span>
        )}
      </div>
      <h2 className="text-calc-xl text-abu_primary font-bold font-montserrat">
        {data.title?.[locale] || "Заголовок отсутствует"}
      </h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="pt-0 h-[550px] mt-10 "
      >
        {images?.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide relative bg-slate-100 w-full h-full overflow-hidden rounded-sm"
            >
              <Image
                src={`${backendImageUrl}${image}`}
                alt={data?.title?.[locale] || "Изображение"}
                fill
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="swiper-slide relative bg-slate-100 w-full h-full flex items-center justify-center">
            <p>Изображения отсутствуют</p>
          </SwiperSlide>
        )}
      </Swiper>
      <div
        className="quill-content mt-20"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></div>
    </section>
  );
}
