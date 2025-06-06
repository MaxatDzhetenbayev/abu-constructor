"use client"

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { backendImageUrl } from "@/shared/lib/constants";

export function TabsClient({ contents, locale }: { contents: any; locale: string }) {

  const params = useParams();
  const slugs = params.slug as string[];
  const currentPath = slugs[slugs.length - 1];

  return (
    <ul className="flex flex-wrap gap-5">
      {contents?.map((tab: any, idx: number) => {


        const WrapperComponent =
          tab.content.link
            ? (Link as React.ElementType)
            : ("div" as const);

        const linkProps = tab.content.link
          ? { href: `${currentPath}/${tab.content.link}` }
          : {};

        return (<li
          key={idx}
        >
          <WrapperComponent {...linkProps} className="flex-grow flex min-w-[260px] gap-4 p-6 bg-[#640000] text-white rounded-md cursor-pointer justify-between items-center">
            <h2>{tab.content[locale].title}</h2>
            {tab?.content?.icon && (<Image
              src={backendImageUrl + tab?.content?.icon}
              alt="icon"
              width={50}
              height={50}
            />)}
          </WrapperComponent>
        </li>
        );
      })}
    </ul>
  );
}


