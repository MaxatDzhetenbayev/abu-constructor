"use client";
import { useState } from "react";

import { NewsItem, useNews } from "@/entities/news";
import { newsSource } from "@/entities/news/types/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Skeleton,
} from "@/shared/ui";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  const locale = params?.locale ?? "en";
  const skeletonNews = Array.from({ length: 8 }).fill(1);

  const [offset, setOffset] = useState(0);
  const [limit] = useState(8);

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filter, onFilter] = useState({});

  const { data, isLoading } = useNews({
    limit,
    offset,
    source: newsSource.ABU,
    lang: locale,
    ...filter,
  });
  const totalPages = Math.ceil((data?.count ?? 0) / limit);

  const maxVisiblePages = 10;
  const currentPage = Math.floor(offset / limit) + 1;

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxVisiblePages) {
    startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2),
    );
    endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  }

  const pages =
    totalPages > 0
      ? Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx)
      : [];

  const handleFilter = () => {
    if (dateRange.start && dateRange.end && dateRange.end < dateRange.start) {
      return;
    }
    onFilter({ search, startDate: dateRange.start, endDate: dateRange.end });
  };

  const handleReset = () => {
    setSearch("");
    setDateRange({ start: "", end: "" });
    onFilter({ search: "", startDate: "", endDate: "" });
  };

  const handleOffsetChange = (newOffset: number) => {
    if (newOffset >= 0 && newOffset < (data?.count ?? 0)) {
      setOffset(newOffset);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto mt-20 ">
      <div className="p-4 mb-4 border rounded-lg shadow-sm">
        <div className="flex max-md:grid max-md:grid-cols-1">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-1 md:col-span-3 flex gap-2">
            <button
              className="bg-abu_primary text-white p-2 rounded w-full"
              onClick={handleFilter}
            >
              Применить
            </button>
            <button className="border p-2 rounded w-full" onClick={handleReset}>
              Сбросить
            </button>
          </div>
        </div>
      </div>
      <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[600px]">
        {isLoading ? (
          <>
            {skeletonNews.map((_, idx) => (
              <article key={idx}>
                <Skeleton className="w-full h-[260px]" />
                <Skeleton className="w-full h-[20px] mt-3" />
                <Skeleton className="w-full h-[50px] mt-5" />
              </article>
            ))}
          </>
        ) : data?.items?.length ? (
          data.items.map((item) => (
            <NewsItem key={item.id} item={item} locale={locale} />
          ))
        ) : (
          <div className="text-center">No news items found</div>
        )}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            isActive={offset > 0}
            onClick={() => handleOffsetChange(offset - limit)}
          />
          {pages.map((page) => {
            const pageOffset = (page - 1) * limit;
            const isCurrent = offset === pageOffset;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={isCurrent}
                  onClick={() => handleOffsetChange(pageOffset)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationNext
            isActive={offset + limit < (data?.count ?? 0)}
            onClick={() => handleOffsetChange(offset + limit)}
          />
        </PaginationContent>
      </Pagination>
    </section>
  );
}
