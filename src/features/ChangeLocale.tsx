"use client";
import { useParams, usePathname, useRouter } from "next/navigation";

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

  const handleChange = (value: string) => {
    router.replace(`/${value}/${slug}`);
  };

  return (
    <Select
      value={params.locale as string}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="max-w-[75px] bg-inherit border-none font-bold text-white   focus:ring-0 flex">
        <SelectValue placeholder={params.locale} />
      </SelectTrigger>
      <SelectContent className="text-[#640000] font-bold">
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="kz">KZ</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
};
