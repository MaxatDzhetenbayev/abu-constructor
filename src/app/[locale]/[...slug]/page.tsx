import { Metadata } from "next";

import { fetchNavigationWithWidgetsBySlug } from "@/entities/navigation/api/fetchNavigationBySlug";
import { transfromWidgets } from "@/entities/navigation/libs/transformWidgets";
import { GeneralPageProps } from "@/shared/types";
import { getWidgetByName, } from "@/widgets";

export const metadata: Metadata = {
  title: "КГУ «ЦЕНТР ТРУДОВОЙ МОБИЛЬНОСТИ ОБЛАСТИ АБАЙ»"
}
export default async function Page({
  params: { slug, locale },
}: GeneralPageProps) {
  const { widgets } = await fetchNavigationWithWidgetsBySlug(slug);
  const widgetList = transfromWidgets({ widgets, locale, getWidgetByName });

  return (
    <section
      className="flex-1"
    >
      <section className="flex flex-col gap-[70px] scroll-behavior: smooth">
        {widgetList}
      </section>
    </section>
  );
}
