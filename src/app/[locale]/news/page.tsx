"use client";
import { NewsItem, useNews } from "@/entities/news";
import { Skeleton } from "@/shared/ui";

export default function Page({ params }: any) {
  const locale = params.locale as string;
  const { data, isLoading } = useNews()
  const skeletonNews = Array.from({ length: 8 }).fill(1);

  return (
    <section className="max-w-[1200px] mx-auto mt-20 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
      {isLoading ? (
        <>
          {skeletonNews.map((item, idx) => (
            <article key={idx}>
              <Skeleton className="w-full h-[260px]" />
              <Skeleton className="w-full h-[20px] mt-3" />
              <Skeleton className="w-full h-[50px]mt-5" />
            </article>
          ))}
        </>
      ) : data?.map((item) => (
        <NewsItem key={item.id} item={item} locale={locale} />
      ))}
    </section>
  );
}