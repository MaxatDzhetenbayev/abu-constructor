"use client"
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNewsbyId, viewPluralWordsCollection } from "@/entities/news";
import { useWordPlural } from "@/shared/lib";
import { backendImageUrl, } from "@/shared/lib/constants";
import { Skeleton } from "@/shared/ui";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Page({ params }: any) {
    const { id, locale } = params
    const { data, isLoading } = useNewsbyId(id)

    if (isLoading) return (
        <section>
            <Skeleton className="w-full h-[20px] max-w-[200px]" />
            <Skeleton className="w-full h-[20px] mt-3 max-w-[600px]" />
            <Skeleton className="w-full h-[550px] mt-10" />
            <section className="mt-20">
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[20px] mt-3" />
            </section>
        </section>
    )

    if (!data) return (
        <section>
            <h1>Страница не найдена</h1>
        </section>
    )

    const { description, images } = data.content[locale]
    const { getWord } = useWordPlural(locale)

    return (
        <section>
            <div>
                {data.createdAt &&
                    <span className="font-raleway text-gray-400">
                        Создано:
                        {" " + new Intl.DateTimeFormat(locale, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }).format(new Date(data.createdAt)) + ", "}
                    </span>
                }
                {data.viewCount !== undefined &&
                    <span className="font-raleway text-gray-400">
                        {data.viewCount}
                        {" " + getWord(data.viewCount, viewPluralWordsCollection)}
                    </span>
                }
            </div>
            <h2 className="text-calc-xl text-abu_primary font-bold font-montserrat">
                {data.title[locale]}
            </h2>
            <Swiper
                modules={[Pagination]}
                className="pt-0 h-[550px] mt-10 "
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide relative bg-slate-100 w-full h-full overflow-hidden">
                        <Image src={`${backendImageUrl}${image}`} alt={data?.title[locale]} fill style={{ objectFit: "cover" }} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="quill-content mt-20" dangerouslySetInnerHTML={{ __html: description }}></div>
        </section>
    )
}