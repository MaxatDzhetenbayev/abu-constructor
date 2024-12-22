"use client";

import { useTranslations } from "next-intl";

import { Button, Input } from "@/shared/ui";

export const UpdateLinksForm = () => {
  const t = useTranslations("settings");
  return (
    <form className="flex flex-col gap-3 max-w-[400px]">
      <Input label="Instagram" />
      <Input label="Youtube" />
      <Input label="Facebook" />
      <Input label="VK" />
      <Input label="Телефон" />
      <Input label="Email" />
      <Button>{t("updateBtn")}</Button>
    </form>
  );
};
