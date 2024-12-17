"use client"
import React from 'react'
import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import clsx from 'clsx';

import { backendImageUrl } from '@/shared/lib/constants';


export const SwiperGallery = ({ contents }: { contents: any[] }) => {
    return (
        <Swiper
            modules={[Pagination]}
        >
            {contents.map(({ content }, idx) => (
                <SwiperSlide key={idx} className='overflow-hidden rounded-lg'>
                    <div
                        className={clsx(
                            "relative max-md:h-[360px] h-[480px] w-[1200px]  "
                        )}
                    >
                        <Image
                            className="w-full h-full object-cover rounded-md"
                            fill
                            quality={80}
                            src={`${backendImageUrl}${content.image}`}
                            alt=""
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
