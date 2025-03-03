"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

export const ChangeLocale = () => {
  const params = useParams();
  const router = useRouter();
  const path = usePathname().split("/");
  const slug = path.slice(2, path.length).join("/");

  const [scrollY, setScrollY] = useState(0);

  const handleChange = (value: string) => {
    setScrollY(window.scrollY); // Запоминаем позицию перед сменой языка
    router.replace(`/${value}/${slug}`);
  };

  useEffect(() => {
    window.scrollTo(0, scrollY); // Восстанавливаем позицию после рендера
  }, [scrollY]);

  return (
    <Select
      value={params.locale as string}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="max-w-[75px] bg-inherit border-none font-bold text-white focus:ring-0 flex">
        <SelectValue placeholder={params.locale} />
      </SelectTrigger>
      <SelectContent className="text-[#640000] font-bold">
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="kz">KZ</SelectItem>
      </SelectContent>
    </Select>
  );
};
