import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { LastNews } from "../LastNews";

export const Sidebar = () => {
  const t = useTranslations();

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
    </aside>
  );
};
