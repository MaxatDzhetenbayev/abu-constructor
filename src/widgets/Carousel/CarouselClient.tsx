'use client'
import React from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { CarouselProps } from './modele/Carousel.interface';
import { backendImageUrl } from '@/shared/lib/constants';

export const CarouselClient = ({ items, variant, perView, title }: CarouselProps) => {

    const params = useParams();
    return (
        <section>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={perView === '1' ? {} : {
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                loop={true}
                spaceBetween={perView === '1' ? 0 : 10}
                modules={[Pagination, Autoplay,]}
                className={clsx("w-full rounded-2xl", {
                    'h-48': variant === 'small',
                    'h-80': variant === 'medium',
                    'h-[550px]': variant === 'large',
                })}>
                {items.map((item) => {
                    const Comp = item.href
                        ? (Link as React.ElementType)
                        : ("div" as "div");

                    return (
                        <SwiperSlide className='relative w-full h-full'>
                            <Comp href={`/${params.locale}/${item.href}`}>
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url('${backendImageUrl}/${item.image}')`
                                    }}
                                ></div>
                                <section className="absolute inset-0 bg-black bg-opacity-20 flex items-end text-justify">
                                    <section className='pb-8 px-5'>
                                        <h1 className="text-white text-4xl font-bold">{item.title}</h1>
                                        <p className="text-white text-xl">{item.content}</p>
                                    </section>
                                </section>
                            </Comp>
                        </SwiperSlide>
                    )
                }
                )}
            </Swiper >
        </section>
    )
}
