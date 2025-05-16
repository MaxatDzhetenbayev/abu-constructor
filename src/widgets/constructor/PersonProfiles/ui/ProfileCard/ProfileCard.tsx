'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { backendImageUrl } from '@/shared/lib/constants';
import { Modal, MoreArrow } from '@/shared/ui';

export const ProfileCard = ({ locale, content }: { locale: string, content: any }) => {

    const { job_title, full_name, description: body } = content[locale]

    const t = useTranslations()

      const filePath =
            content?.image?.[locale] || content?.image?.ru;

    return (
        <Modal modalSlot={body}>
            <section className="flex px-5 cursor-pointer  flex-col  gap-2 shadow-[0_0_30px_0px_rgba(0,0,0,0.05)] rounded-2xl bg-white mt-4 ">
                <section className="relative max-w-[400px] w-full h-[363px] sm:mx-auto">
                    <Image
                        src={`${backendImageUrl}${filePath}`}
                        fill
                        priority
                        objectFit="cover"
                        alt="image"
                        className="rounded-2xl"
                    />
                </section>
                <section className="flex flex-1 py-5 flex-col  ">
                    <div>
                        <p className="text-abu_primary font-bold text-calc-md">{job_title}</p>
                        <h2 className="font-bold text-calc-xl">{full_name}</h2>
                    </div>
                    <div className="flex items-center gap-5 mt-[15px]">
                        <p className="group-hover:text-white">{t("details")}</p>
                        <MoreArrow width={17} height={13} />
                    </div>
                </section>
            </section>
        </Modal>
    )
};
