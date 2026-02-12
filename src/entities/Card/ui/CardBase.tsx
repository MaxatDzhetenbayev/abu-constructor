"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";

import { backendImageUrl } from "@/shared/lib/constants";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { ICard } from "@/widgets/constructor/Cards/model/Cards.interface";

type ICardWithPath = ICard & Record<"currentPath", string>;

export const CardBase = ({
  content,
  locale,
  variant,
  currentPath,
  styles,
}: ICardWithPath) => {
  const { title, content: description } = content[locale];
  const t = useTranslations("");
  
  // Получаем файл для текущей локали, если это объект с локализованными значениями
  const file = typeof content.file === 'object' && content.file !== null
    ? content.file[locale]
    : content.file;
  
  // Получаем изображение для текущей локали, если это объект с локализованными значениями
  const image = typeof content.image === 'object' && content.image !== null
    ? content.image[locale] || content.image.ru
    : content.image;
  
  const WrapperComponent =
    file || content.link
      ? (Link as React.ElementType)
      : ("div" as const);

  const linkProps = file
    ? { href: `${backendImageUrl}/${file}`, target: "_blank" }
    : content.link && { href: `${currentPath}/${content.link}` };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <WrapperComponent
            {...linkProps}
            className={clsx(
              "flex grow gap-5 rounded-2xl shadow-md overflow-hidden p-[20px] group bg-[url('/images/backgrounds/background-2.png')] hover:bg-[url('/images/backgrounds/background-1.png')] transition-colors duration-700",
              styles,
              variant === "with_modal"
                ? "flex-col"
                : "justify-between items-center"
            )}
          >
            {variant !== "with_modal" ? (
              <>
                <Heading title={title} />
                <Image
                  src="/icons/right-arrow-primary.svg"
                  width={36}
                  height={24}
                  alt="Кнопка для активации"
                />
              </>
            ) : (
              <div className="h-full flex flex-col">
                {image && (
                  <div className="relative w-full h-[260px]">
                    <Image
                      src={`${backendImageUrl}${image}`}
                      fill
                      className="rounded-xl"
                      alt="Изображение"
                    />
                  </div>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="grow  flex flex-col justify-between">
                      <Heading title={title} />
                      <div className="flex items-center gap-5 mt-[15px]">
                        <p className="group-hover:text-abu_primary_hover">
                          {t("details")}
                        </p>
                        <Image
                          src="/icons/right-arrow-primary.svg"
                          width={17}
                          height={13}
                          alt="Кнопка для активации"
                        />
                      </div>
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
            )}
          </WrapperComponent>
        </TooltipTrigger>
        {title.length > 28 && (
          <TooltipContent>
            <h2 className="text-calc-xl grow font-bold p-1">{title}</h2>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const Heading = ({ title }: { title: string }): React.JSX.Element => {
  return (
    <h2 className="text-calc-xl grow font-bold text-left text-abu_primary_hover line-clamp-2">
      {title}
    </h2>
  );
};
