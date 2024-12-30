"use client"
import { useParams } from 'next/navigation'
import React from 'react'

import { INews } from '@/entities/news/model/types'
import { backendUrl } from '@/shared/lib/constants'

import { useQuery } from '@tanstack/react-query'




export default function NewsPage() {


    const lang = useParams().locale as string

    const { data: news } = useQuery<INews[]>({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await fetch(`${backendUrl}/news`)
            return res.json()
        }
    })


    return (
        <section>
            <h1>Новости</h1>
            <ul>
                {news?.map((item) => (
                    <li key={item.id}>
                        {
                            item.title[lang]
                        }
                    </li>
                ))}
            </ul>
        </section>
    )
}
