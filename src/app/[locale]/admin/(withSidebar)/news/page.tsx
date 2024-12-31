"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useNews, useNewsbyId } from '@/entities/news'
import { INews } from '@/entities/news/model/types'
import { locales, LocaleType } from '@/i18n'
import { Button, Input, Modal } from '@/shared/ui'
import QuillEditor from '@/shared/ui/quill-editor'




export default function NewsPage() {
    const lang = useParams().locale as LocaleType[number]
    const { data, isLoading, isError } = useNews({})



    return (
        <section>
            <section>
                {isLoading && <p>Загрузка...</p>}
                {isError && <p>Ошибка загрузки</p>}
                {data?.items && (
                    <ul className='flex flex-col gap-4'>
                        {data.items.map(n => (
                            <Modal key={n.id} modalSlot={<NewsModalContent news={n} />}
                                headerSlot={
                                    <h1 className='text-calc-xl'>Редактирование новости</h1>
                                }
                            >
                                <Button >
                                    <h2>{n.title[lang]}</h2>
                                </Button>
                            </Modal>
                        ))}
                    </ul>
                )}
            </section>
        </section>
    )
}


const NewsModalContent = ({ news: { id } }: { news: Pick<INews, "id"> }) => {

    const { data, isLoading, isError } = useNewsbyId(id)

    const { register, reset, control } = useForm({

    })

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    return (
        <section>
            {isLoading && <p>Загрузка...</p>}
            {isError && <p>Ошибка загрузки</p>}
            {data && (
                <section>
                    <section className="flex flex-col gap-3 border p-5">
                        <h2>Заголовок</h2>
                        <section className="flex  ">
                            {locales.map((locale) => (
                                <Input
                                    key={locale}
                                    label={"Заголовок" + ` (${locale})`}
                                    {...register(`title.${locale}`)}
                                    className='w-full'
                                />
                            ))}
                        </section>
                    </section>


                    {/* текст */}

                    <section className="flex flex-col gap-3 border p-5">
                        <p>Текст</p>
                        <section className="grid gap-3 grid-cols-1 xl:grid-cols-3">
                            {locales.map((locale) => (
                                <Controller
                                    key={locale}
                                    name={`content.content.desctiption.${locale}`}
                                    control={control}
                                    render={({ field }) => (
                                        <QuillEditor
                                            key={locale}
                                            label={`Текст` + ` (${locale})`}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            ))}
                        </section>
                    </section>
                </section>
            )}
        </section>
    )
}