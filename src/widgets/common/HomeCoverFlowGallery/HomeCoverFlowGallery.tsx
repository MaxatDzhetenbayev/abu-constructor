import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

export const HomeCoverFlowGallery = ({ locale }: { locale: string }) => {

    const gallery_items = Array.from({ length: 15 }, (_, i) => i + 1)

    return (
        <section className="max-w-[1500px] font-raleway px-3  w-full mx-auto">
            <Heading>Галерея</Heading>
            <section className="grid grid-cols-1 lg:grid-cols-[566px,1fr] gap-3">
                <section className="flex flex-col max-lg:order-2 max-lg:text-justify  gap-10">
                    <p>
                        Добро пожаловать в фотогалерею нашего университета! Здесь мы собрали
                        яркие и запоминающиеся моменты из жизни нашего университета,
                        мероприятий и достижений студентов. В каждом альбоме вы сможете
                        увидеть, чем живет наше учебное сообщество: научные исследования,
                        творческие проекты, студенческую жизнь, спортивные события и многое
                        другое. Мы гордимся успехами наших студентов и преподавателей,
                        атмосферой вдохновения и взаимной поддержки, которые делают наш
                        университет по-настоящему уникальным. Наслаждайтесь просмотром и
                        присоединяйтесь к нашей большой университетской семье!
                    </p>
                    <Link href={`/${locale}/university/media_resources`} className="flex py-3 w-full justify-center items-center rounded-lg bg-abu_primary gap-2 text-white text-3xl">
                        Посмотреть все
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
        </section >
    );
};

const Heading = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <h2
            className={clsx(
                "text-calc-2xl max-lg:text-center pl-3 md:pl-0 font-bold mb-4 md:mb-8 text-[#640000]",
                className
            )}
        >
            {children}
        </h2>
    );
};