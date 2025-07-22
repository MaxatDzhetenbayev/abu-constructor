"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

const data: {
  [key: string]: {
    city: string;
    place: string;
    date: string;
    time: string;
  }[];
} = {
  kz: [
    {
      city: "Семей қаласы",
      place:
        "«Гранд Интерьер» Сауда орталығы, «Көктем» Сауда орталығы, «Барыс» Сауда орталығы",
      date: "14.03.2025",
      time: "15.00-17.30",
    },
    {
      city: "Семей қаласы",
      place: "Юность кенті, «Адал» сауда орталығы, «Наурыз» сауда орталығы",
      date: "28.03.2025",
      time: "15.00-17.30",
    },
    {
      city: "Курчатов",
      place: "Курчатов қаласының мансап орталығы",
      date: "04.03.2025",
      time: "15.00",
    },
    {
      city: "Курчатов",
      place:
        "Курчатов қаласының орталығы (жылжымалы бос жұмыс орындары жәрмеңкесі)",
      date: "13.03.2025",
      time: "12.00",
    },
    {
      city: "Абай ауданы",
      place: "Кеңгірбай би ауылдық округі, Мәдениет үйгі",
      date: "17.03.2025",
      time: "15.00",
    },
    {
      city: "Ақсуат ауданы",
      place: "Ақсуат мәдениет үйі",
      date: "14.03.2025",
      time: "11.00",
    },
    {
      city: "Аягоз ауданы",
      place: "Жұмыспен қамту және әлеуметтік бағдарламалар бөлімі ғимараты ",
      date: "17.03.2025",
      time: "15.00",
    },
    {
      city: "Бескарағай ауданы",
      place:
        "Ерназар ауылдық округінің ғимараты\nҚарағайлы ауылының ауылдық клубы",
      date: "13.03.2025\n13.03.2025",
      time: "10.00\n11.30",
    },
    {
      city: "Жаңасемей",
      place:
        "Абай облысы Жаңасемей ауданы Шүлбі кенті әкімінің аппараты мемлекеттік мекемесі",
      date: "13.03.2025",
      time: "10.00",
    },
    {
      city: "Жаңасемей",
      place: "Юность кенті; «Адал» сауда орталығы; «Наурыз» сауда орталығы;",
      date: "28.03.2025",
      time: "10.00",
    },
    {
      city: "Көкпекті ауданы",
      place: "Улкенбокен с.о. әкімшілік ғимаратты",
      date: "19.03.2025",
      time: "11:00",
    },
    {
      city: "Мақаншы ауданы",
      place: "Мансап орталығы Тәтиева көшесі 62",
      date: "28.03.2025",
      time: "10.00",
    },
  ],
  ru: [
    {
      city: "г. Семей",
      place:
        "Торговый центр «Гранд Интерьер», Торговый центр «Көктем», Торговый центр «Барыс»",
      date: "14.03.2025",
      time: "15.00-17.30",
    },
    {
      city: "г. Семей",
      place: "Юность, Торговый центр «Адал», Торговый центр «Наурыз»",
      date: "28.03.2025",
      time: "15.00-17.30",
    },
    {
      city: "г. Курчатов",
      place: "Городской Дворец культуры",
      date: "04.03.2025",
      time: "15.00",
    },
    {
      city: "г. Курчатов",
      place:
        "Городской Дворец культуры (прием граждан без предварительной записи)",
      date: "13.03.2025",
      time: "12.00",
    },
    {
      city: "Абайский район",
      place: "Кенгирбайский сельский округ, Дом культуры",
      date: "17.03.2025",
      time: "15.00",
    },
    {
      city: "Аксуатский район",
      place: "Дом культуры г. Аксуат",
      date: "14.03.2025",
      time: "11.00",
    },
    {
      city: "Аягозский район",
      place: "Здание управления по труду и социальным программам",
      date: "17.03.2025",
      time: "15.00",
    },
    {
      city: "Бескарагайский район",
      place: "Здание Ерназарского сельского округа\nКлуб с. Карагайлы",
      date: "13.03.2025\n13.03.2025",
      time: "10.00\n11.30",
    },
    {
      city: "Жанасемейский район",
      place:
        "Аппарат акима Шульбинского города Жанасемейского района Акмолинской области",
      date: "13.03.2025",
      time: "10.00",
    },
    {
      city: "Жанасемейский район",
      place: "Юность, Торговый центр «Адал», Торговый центр «Наурыз»;",
      date: "28.03.2025",
      time: "10.00",
    },
    {
      city: "Кокпектинский район",
      place: "Здание администрации сельского округа Улкенбокен",
      date: "19.03.2025",
      time: "11:00",
    },
    {
      city: "Маканшинский район",
      place: "Городской Дворец культуры, ул. Татиева 62",
      date: "28.03.2025",
      time: "10.00",
    },
  ],
};


const data_bottom: {
  [key: string]: {
    city: string;
    date: string;
  }[];
} = {
  ru: [
    { city: "Урджарский район", date: "01.07.2025" },
    { city: "Г. Семей", date: "24.07.2025" },
    { city: "Аягозский район", date: "03-04.07.2025" },
    { city: "Жарминский район", date: "15.07.2025" },
    { city: "Бородулихинский район", date: "10.07.2025" },
    { city: "Абайский район", date: "24.07.2025" },
    { city: "Район Аксуат", date: "15 и 17.07.2025" },
    { city: "Г. Курчатов", date: "23.07.2025" },
    { city: "Бескарагайский район", date: "23.07.2025" },
    { city: "Маканчинский район", date: "11.07.2025" },
    { city: "Кокпектинский район", date: "17.07.2025" },
    { city: "Район Жанасемей", date: "18.07.2025" }
  ],
  kz: [
    { city: "Үржар ауданы", date: "01.07.2025" },
    { city: "Семей қ.", date: "24.07.2025" },
    { city: "Аягөз ауданы", date: "03-04.07.2025" },
    { city: "Жарма ауданы", date: "15.07.2025" },
    { city: "Бородулиха ауданы", date: "10.07.2025" },
    { city: "Абай ауданы", date: "24.07.2025" },
    { city: "Ақсуат ауданы", date: "15 және 17.07.2025" },
    { city: "Курчатов қ.", date: "23.07.2025" },
    { city: "Бесқарағай ауданы", date: "23.07.2025" },
    { city: "Мақаншы ауданы", date: "11.07.2025" },
    { city: "Көкпекті ауданы", date: "17.07.2025" },
    { city: "Жаңа-Семей ауданы", date: "18.07.2025" }
  ]
};


export const Sidebar = () => {
  const t = useTranslations();
  const locale = useParams().locale as string;

  return (
    <aside className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-4">
      <iframe
        width="100%"
        height="180"
        src={`https://www.youtube.com/embed/${locale === "ru" ? "XcT3YQrYvZw?si=stqZOIrgY_1u0akI" : "Yd2qtMSAgSU?si=JZaAKZOYVc8Gvd28"}?autoplay=1&mute=1`}
        allow="autoplay; encrypted-media"
        title="YouTube video player"
      ></iframe>
      <Link
        className="bg-abu_primary px-2 py-6 block text-white rounded-lg text-center text-md font-medium"
        href="https://web.telegram.org/k/#@abai_ctm_bot"
        target="_blank"
      >
        {t("online_queue")}
      </Link>
      {/* <LastNews /> */}
      <section className="max-h-[600px] overflow-y-auto">
        <h2 className="text-md font-bold text-center">
          {t("sidebar_table_title")}
        </h2>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>{t("sidebar_table_content.city")}</TableHead>
              <TableHead>{t("sidebar_table_content.date")}</TableHead>
              <TableHead>{t("sidebar_table_content.time")}</TableHead>
              <TableHead>{t("sidebar_table_content.place")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data[locale].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section className="max-h-[600px] overflow-y-auto">
        <h2 className="text-md font-bold text-center">
          {t("sidebar_table_title_bottom")}
        </h2>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>{t("sidebar_table_content.city")}</TableHead>
              <TableHead>{t("sidebar_table_content.date")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data_bottom[locale].map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </aside>
  );
};
