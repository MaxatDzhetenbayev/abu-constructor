import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { getWidgetByName } from "@/shared/lib/utils/GetWidgetByName";
import { capitalize } from "@/shared/lib";

const getPageContent = async (slug: string[], locale: string) => {

  const page = await getPageBySlug(`/${slug.join("/")}`, locale);
  if (page[0]) {
    const content = await getWidgetsToDisplay(page[0].id, locale);

    return content;
  } else {
    return [];
  }
};

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string[] };
}) {
  const data = await getPageContent(params.slug, params.locale);

  return data
    .sort((a, b) => a.order - b.order)
    .map((m: any) =>
      getWidgetByName(capitalize(m.widget_type), JSON.parse(m.options))
    );
}