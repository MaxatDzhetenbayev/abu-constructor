"use client";
import { useState } from "react";
import Snowfall from "react-snowfall";

import { NewsItem, useNews } from "@/entities/news";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Skeleton,
} from "@/shared/ui";

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
    ...filter,
  });
  const totalPages = Math.ceil((data?.count ?? 0) / limit);

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
      <Snowfall />
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
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            const isCurrent = offset === idx * limit;
            return (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={isCurrent}
                  onClick={() => handleOffsetChange(idx * limit)}
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
