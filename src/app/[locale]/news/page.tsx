"use client";
import { useState } from "react";

import { NewsItem, useNews } from "@/entities/news";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

  const { data, isLoading } = useNews({ limit, offset });




  const totalPages = Math.ceil((data?.count ?? 0) / limit);

  console.log(offset)

  const handleOffsetChange = (newOffset: number) => {
    if (newOffset >= 0 && newOffset < (data?.count ?? 0)) {
      setOffset(newOffset);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto mt-20 ">
      <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-[800px]">
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
