import { fetchSearchResults } from "@/entities";
import { LocaleType } from "@/i18n";
import { useDebounce } from "@/shared/lib/hooks/useDebounce";

import { useQuery } from "@tanstack/react-query";
export const useSearch = (query: string, locale: LocaleType[number]) => {
  const debouncedQuery = useDebounce(query, 1000);

  const { data, isLoading } = useQuery({
    queryFn: () => fetchSearchResults(query, locale),
    queryKey: ["search", debouncedQuery, locale],
    enabled: !!debouncedQuery,
  });

  return { data, isLoading };
};
