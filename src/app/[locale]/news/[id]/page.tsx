"use client"

import { backendUrl } from "@/shared/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface INews {
    id: number,
    title: {
        [key: string]: any
    },
    content: {
        [key: string]: any
    },
    viewCount: number,
    createdAt: Date,
    updatedAt: Date,
}

export default function Page({ params }: any) {

    const { id, locale } = params

    const { data, isLoading } = useQuery<INews[]>({
        queryKey: ["news", id],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/news/${id}`);
            return response.json();
        },
    });


    console.log(data)


    return (
        <section>
            <Swiper
                modules={[Pagination]}
                className="gallery-swiper pt-0"
            >

            </Swiper>
        </section>
    )
}