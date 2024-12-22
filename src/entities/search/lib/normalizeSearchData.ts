import { LocaleRecordType, LocaleType } from "../../../i18n";

interface ISearchItem {
  type: string;
  title: LocaleRecordType<string>;
  slug: string;
  all_title: string;
  navigation: {
    type: string;
    slug: string;
    all_title: string;
  };
  options: {
    content: LocaleRecordType<{ title: string }>;
  };
}

export const normalizeSearchData = <T extends ISearchItem>(
  data: T[],
  locale: LocaleType[number]
) => {
  return data.map((item) => {
    if (item.type) {
      return {
        slug: item.slug,
        title: item.title[locale],
        type: item.type,
        all_title: item.all_title,
      };
    }
    return {
      slug: item.navigation.slug,
      title: item.options.content[locale].title,
      type: item.navigation.type,
      all_title: item.navigation.all_title,
    };
  });
};
