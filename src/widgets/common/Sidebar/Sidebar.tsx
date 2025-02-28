"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

import { LastNews } from "../LastNews";


const data: {
  [key: string]: {
    city: string;
    date: string;
  }[]
} =
{
  kz: [
    {
      city: "Семей қаласы",
      date: "02.02.2024ж\n09.02.2024ж\n16.02.2024ж",
    },
    {
      city: "Жарма ауданы",
      date: "02.02.2024ж",
    },
    {
      city: "Бесқарағай ауданы",
      date: "15.02.2024ж",
    },
    {
      city: "Бородулиха ауданы",
      date: "15.02.2024ж",
    },
    {
      city: "Көкпекті ауданы",
      date: "15.02.2024ж",
    },
    {
      city: "Аягөз ауданы",
      date: "15.02.2024ж",
    },
    {
      city: "Ұржар ауданы",
      date: "16.02.2024ж",
    },
    {
      city: "Курчатов қаласы",
      date: "28.02.2024ж",
    },
    {
      city: "Ақсуат ауданы",
      date: "28.02.2024ж",
    },
    {
      city: "Абай ауданы",
      date: "29.02.2024ж",
    }
  ],
  ru: [

    {
      city: "г. Семей",
      date: "02.02.2024г\n09.02.2024г\n16.02.2024г",
    },
    {
      city: "Жарминский район",
      date: "02.02.2024г",
    },
    {
      city: "Бескарагайский район",
      date: "15.02.2024г",
    },
    {
      city: "Бородулихинский район",
      date: "15.02.2024г",
    },
    {
      city: "Кокпектинский район",
      date: "15.02.2024г",
    },
    {
      city: "Аягозский район",
      date: "15.02.2024г",
    },
    {
      city: "Уржарский район",
      date: "16.02.2024г",
    },
    {
      city: "г. Курчатов",
      date: "28.02.2024г",
    },
    {
      city: "Аксуатский район",
      date: "28.02.2024г",
    },
    {
      city: "Абайский район",
      date: "29.02.2024г",
    }
  ]
}


export const Sidebar = () => {
  const t = useTranslations();
  const locale = useParams().locale as string;

  return (
    <aside className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-4">
      <Link
        className="bg-abu_primary px-2 py-6 block text-white rounded-lg text-center text-md font-medium"
        href="https://web.telegram.org/k/#@abai_ctm_bot"
        target="_blank"
      >
        {t("online_queue")}
      </Link>
      <LastNews />
      <section>
        <h2 className="text-md font-bold text-center">{t("sidebar_table_title")}</h2>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>{t("sidebar_table_content.city")}</TableHead>
              <TableHead>{t("sidebar_table_content.date")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data[locale].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </section>
    </aside>
  );
};
