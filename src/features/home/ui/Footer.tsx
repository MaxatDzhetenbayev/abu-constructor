"use client";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

export const Footer = () => {
  const t = useTranslations();

  const socials = [
    {
      link: "https://www.facebook.com/share/1D3oDLZEuy/?mibextid=wwXIfr",
      icon: "/enbek/socials/Facebook.png",
    },
    {
      link: "https://www.instagram.com/abai_emo?igsh=c2F4czJzdHExMm9s",
      icon: "/enbek/socials/Instagram.png",
    },
    {
      link: "https://t.me/abai_emo",
      icon: "/enbek/socials/Telegram.png",
    },
    {
      link: "https://www.tiktok.com/@abai_emo?_t=ZM-8uGDpD5ArNn&_r=1",
      icon: "/enbek/socials/TikTok.png",
    },
  ];

  return (
    <footer className="bg-abu_primary">
      <section className="container px-4 py-8 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
        <div className="flex flex-col gap-4 text-white">
          <h2 className="text-2xl font-bold">{t("our_contacts")}</h2>
          <div className="flex gap-3">
            <MapPin />
            <span>Абай облысы, Семей қаласы, Т.Ұранхаев көшесі 53</span>
          </div>
          <div className="flex gap-3">
            <Phone />
            <span>
              <Link type="tel" href="tel:+77222354841">8 (7222) 35-48–41</Link>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-white text-2xl font-bold">{t("subscribe")}</h2>
          <div className="flex gap-4">
            {socials.map(({ icon, link }, index) => (
              <Link href={link} target="_blank" key={index}>
                <Image src={icon} alt={link} width={40} height={40} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
};
