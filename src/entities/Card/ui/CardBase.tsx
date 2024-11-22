"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { backendImageUrl } from "@/shared/lib/constants";
import clsx from "clsx";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
export const CardBase = ({
  content,
  locale,
  variant,
  size = "normal",
  currentPath,
}: {
  content: any;
  variant: string;
  locale: string;
  size: string;
  currentPath: string;
}) => {
  const { title, content: description } = content[locale];
  const hasDescription = Boolean(description && description.length > 0);

  const sizeClasses = {
    normal: "h-[200px]",
    medium: "h-[350px]",
    large: "h-[550px]",
  }[size];

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
        "flex grow basis-[376px] min-w-72 p-5  gap-5 rounded-2xl  shadow-md",
        variant === "with_modal" ? "flex-col" : "justify-between items-center"
      )}
    >
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
      {variant !== "with_modal" ? (
        <div className="relative  h-6 min-w-9">
          <Image src="/icons/right-arrow.svg" fill alt="Кнопка для актиавции" />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-5">
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
      )}
    </WrapperComponent>
  );

  return (
    <article className={clsx("rounded-md")}>
      <WrapperComponent
        {...linkProps}
        className="block after:rounded-md after:absolute rounded-2xl relative overflow-hidden shadow-md"
      >
        {renderContent()}
      </WrapperComponent>
    </article>
  );

  function renderContent() {
    return (
      <div className={clsx(sizeClasses)}>
        <section
          className={clsx(
            hasDescription ? "h-[82%]" : "h-[100%]",
            "w-full relative"
          )}
        >
          {content.image ? (
            <>
              <Image
                src={`${backendImageUrl}${content.image}`}
                fill
                objectFit="cover"
                objectPosition="top"
                alt="image"
                className="rounded-md"
              />
              {!hasDescription && (
                <>
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <h2 className="text-white text-center font-bold text-xl relative px-2 flex w-full h-full items-center justify-center">
                    {title}
                  </h2>
                </>
              )}
            </>
          ) : (
            <div className={`absolute inset-0  opacity-75`}>
              <h2 className="text-white text-center font-bold text-xl relative px-2 flex w-full h-full items-center justify-center">
                {title}
              </h2>
            </div>
          )}
        </section>

        {hasDescription && (
          <div className="p-3">
            <h2 className="font-bold text-xl">{title}</h2>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{
                __html:
                  variant === "horizontal"
                    ? description
                    : description.length > 110
                      ? `${description.slice(0, 110)}...`
                      : description,
              }}
            ></p>
          </div>
        )}
      </div>
    );
  }
};
