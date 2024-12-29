"use client";
import clsx from "clsx";
import { useState } from "react";

export const AccordionItem = ({
    body,
    title,
}: {
    body: string;
    title: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(
                    "bg-enbek_primary hover:bg-abu_primary_hover w-full text-left p-4 rounded-t-xl text-white flex justify-between items-center text-2xl",
                    !isOpen && "rounded-b-xl"
                )}
            >
                {title}
                <img src="/icons/arrow.svg" className="w-6" alt="arrow" />
            </button>
            {isOpen && (
                <div
                    className="p-5 text-justify  border-x-enbek_primary border-b-enbek_primary border-2 border-t-0 rounded-b-xl"
                    dangerouslySetInnerHTML={{ __html: body }}
                />
            )}
        </li>
    );
};
