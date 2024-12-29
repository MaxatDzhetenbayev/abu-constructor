"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { backendImageUrl } from "@/shared/lib/constants";
import { Dialog, DialogContent, DialogTrigger, MoreArrow } from "@/shared/ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { ICard } from "@/widgets/constructor/Cards/model/Cards.interface";

type ICardWithPath = ICard & Record<"currentPath", string>

export const CardBase = ({
    content,
    locale,
    variant,
    currentPath,
    styles,
}: ICardWithPath) => {
    const { title, content: description } = content[locale];

    const WrapperComponent =
        content.file || content.link
            ? (Link as React.ElementType)
            : ("div" as const);

    const linkProps = content.file
        ? { href: `${backendImageUrl}/${content.file}`, target: "_blank" }
        : content.link && { href: `${currentPath}/${content.link}` };



    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <WrapperComponent
                        {...linkProps}
                        className={clsx(
                            "flex grow gap-5 rounded-2xl shadow-md overflow-hidden p-[20px] group hover:bg-enbek_primary transition-colors duration-500",
                            styles,
                            variant === "with_modal"
                                ? "flex-col"
                                : "justify-between items-center"
                        )}
                    >
                        {variant !== "with_modal" ? (
                            <>
                                <Heading title={title} />
                                <MoreArrow width={36} height={24} />
                            </>
                        ) : (
                            <div className="h-full flex flex-col">
                                {content.image && (
                                    <div className="relative w-full h-[260px]">
                                        <Image
                                            src={`${backendImageUrl}${content.image}`}
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
                                                <p className="group-hover:text-white">Подробнее</p>
                                                <MoreArrow width={17} height={13} />
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
                <TooltipContent>
                    {
                        title.length > 28 && (
                            <h2
                                className="text-calc-xl grow font-bold p-1"
                            >
                                {title}
                            </h2>
                        )
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};

const Heading = ({ title }: { title: string }): React.JSX.Element => {
    return (
        <h2
            className="text-calc-xl grow font-bold text-left group-hover:text-white line-clamp-2"
        >
            {title}
        </h2>
    )
}
