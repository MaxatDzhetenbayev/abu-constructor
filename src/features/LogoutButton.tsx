"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { fetchLogout } from "@/shared/api/login";
import { Button } from "@/shared/ui";

export const LogoutButton = () => {
  const t = useTranslations("sidebar");
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={async () => {
        await fetchLogout()
        router.refresh();
      }}
      className="text-black font-bold md:justify-self-center md:w-full"
    >
      {t("logout")}
    </Button>
  );
};
