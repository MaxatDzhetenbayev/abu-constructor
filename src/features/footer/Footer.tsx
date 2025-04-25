import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React from 'react'

import { Separator } from '@radix-ui/react-select'

export const Footer = () => {

    const t = useTranslations();

    return (
        <footer className="w-full  bg-abu_primary">
            <div className=" max-w-[1200px] mx-auto p-10 ">
                <div className=" flex justify-between items-center mb-10">
                    <div className="flex flex-col gap-4  text-white">
                        <h2 className="text-2xl">{t("home.contacts.our")}</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-4">
                                <Phone />
                                <a href="tel:+7 7222 42-32-24">+7 (7222) 42-32-24</a>
                            </div>
                            <div className="flex gap-4">
                                <Mail />
                                <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
                            </div>
                            <div className="flex gap-4">
                                <MapPin />
                                <span>{t("home.contacts.geo")}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                <span className="text-white block mt-4">
                    ©{new Date().getFullYear()} {t("all_rights")}.
                </span>
            </div>
        </footer>
    )
}
