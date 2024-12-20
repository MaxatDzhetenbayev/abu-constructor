"use client";
import Image from "next/image";
import Link from "next/link";

import { useNews } from "@/entities/news";

import { Skeleton } from "@/shared/ui";
import { backendImageUrl } from "@/shared/lib/constants";


export default function Page({ params }: any) {
  const { locale } = params;
  const { data, isLoading } = useNews()
  const skeletonNews = Array.from({ length: 8 }).fill(1);

  return (
    <section className="max-w-[1200px] mx-auto mt-20 grid grid-cols-4 gap-5">
      {isLoading ? (
        <>
          {skeletonNews.map((item: any) => (
            <article key={item}>
              <Skeleton className="w-full h-[260px]" />
              <Skeleton className="w-full h-[20px] mt-3" />
              <Skeleton className="w-full h-[50px]mt-5" />
            </article>
          ))}
        </>
      ) : (
        <>
          {data?.map((item) => {
            const title = item.title[locale];
            const { description, images } = item.content[locale];

            return (
              <Link href={`news/${item.id}`} tabIndex={0} key={item.id}>
                <div className="relative bg-slate-100 w-full h-[260px] rounded-2xl overflow-hidden">
                  {
                    images[0] && (
                      <Image
                        alt={title}
                        fill
                        src={`${backendImageUrl}${images[0]}`}
                        style={{ objectFit: "cover" }}
                      />
                    )
                  }
                </div>
                <p className="font-raleway">
                  {item.createdAt &&
                    new Intl.DateTimeFormat(locale, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(item.createdAt))}
                </p>
                <h2 className="text-calc-md text-abu_primary font-bold font-montserrat">
                  {title}
                </h2>
                <p className="line-clamp-2">{description}</p>
              </Link>
            );
          })}
        </>
      )}
    </section>
  );
}