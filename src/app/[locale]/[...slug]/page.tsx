import { getPageBySlug } from "@/shared/api/pages";
import { getWidgetsToDisplay } from "@/shared/api/widgets";
import { capitalize } from "@/shared/lib";
import { Cards, Carousel, Text, List } from "@/widgets";
import { CardLinks } from "@/widgets/CardLinks/CardLinks";

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

const getWidgetByName = (name: string, props: any) => {
  switch (name) {
    case "Carousel":
      return <Carousel {...props} />;
    case "Cards":
      return <Cards {...props} />;
    case "List":
      return <List {...props} />;
    case "Text":
      return <Text {...props} />;
    case "CardLinks":
      return <CardLinks {...props} />;
    default:
      return <></>;
  }
};
