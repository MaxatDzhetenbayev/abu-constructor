import { getWidgetByName } from "@/widgets";
import { SideMenu } from "@/widgets/common/SideMenu/SideMenu";
import { Metadata } from "next";
import { GeneralPageProps } from "@/shared/types";
import { fetchNavigationWithWidgetsBySlug } from "@/entities/navigation/api/fetchNavigationBySlug";
import { transfromWidgets } from "@/entities/navigation/libs/transformWidgets";

export const metadata: Metadata = {
  title: "Alikhan Bokeikhanov University",
};

export default async function Page({
  params: { slug, locale },
}: GeneralPageProps) {
  const { widgets } = await fetchNavigationWithWidgetsBySlug(slug);
  const widgetList = transfromWidgets({ widgets, locale, getWidgetByName });

  return (
    <section
      // className={clsx(
      //   widgets?.length >= 3 && "sm:grid sm:grid-cols-[1fr_210px] sm:gap-5"
      // )}
    >
      <section className="flex flex-col gap-[70px] scroll-behavior: smooth">
        {widgetList}
      </section>
      {/* {widgets?.length >= 3 && (
        <SideMenu widgets={widgets} locale={params.locale} />
      )} */}
    </section>
  );
}
