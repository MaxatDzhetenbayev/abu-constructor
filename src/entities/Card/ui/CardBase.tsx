"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { backendImageUrl } from "@/shared/lib/constants";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";

export const CardBase = ({
  content,
  locale,
  variant,
  currentPath,
  styles,
}: {
  content: any;
  variant: string;
  locale: string;
  currentPath: string;
  styles?: string
}) => {
  const { title, content: description } = content[locale];

  const WrapperComponent =
    content.file || content.link
      ? (Link as React.ElementType)
      : ("div" as "div");

  const linkProps = content.file
    ? { href: `${backendImageUrl}/${content.file}`, target: "_blank" }
    : content.link && { href: `${currentPath}/${content.link}` };

  return (
    <WrapperComponent
      {...linkProps}
      className={clsx(
        "flex grow gap-5 rounded-2xl  shadow-md",
        styles,
        variant === "with_modal"
          ? "flex-col p-[10px]"
          : "justify-between items-center p-5"
      )}
    >
      {variant !== "with_modal" ? (
        <>
          <h2
            className="text-[24px] grow font-bold"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h2>
          <div className="relative  h-6 min-w-9">
            <Image
              src="/icons/right-arrow.svg"
              fill
              alt="Кнопка для актиавции"
            />
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col">
          {content.image && (
            <div className="relative w-full h-[260px] ">
              <Image
                src={`${backendImageUrl}${content.image}`}
                fill
                className="rounded-xl"
                alt="Изображение"
              />
            </div>
          )}

          <div className="grow mt-[15px]  px-[10px] flex flex-col justify-between ">
            <h2
              className="text-[24px] grow font-bold"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-5 mt-[15px]">
                  Подробнее
                  <Image
                    src="/icons/right-arrow.svg"
                    width={17}
                    height={13}
                    alt="Кнопка для актиавции"
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[80%] overflow-auto max-w-[90%] [@media(min-width:1180px)]:max-w-[50%]">
                <div
                  className={`quill-content`}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </WrapperComponent>
  );
};
