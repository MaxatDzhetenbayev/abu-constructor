'use client';
import React, { ReactNode, useState } from 'react'
import { AccardionItemProps } from './model/Accardion.interface';
import clsx from 'clsx';

export const AccardionItem = ({ title, content }: AccardionItemProps): ReactNode => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <li
                onClick={() => setIsOpen(!isOpen)}
                className={clsx("flex flex-col gap-3 cursor-pointer")}>
                <div className={clsx("rounded-[10px] shadow-[0px_4px_23.5px_4px_rgba(0,0,0,0.11)] min-h-[90px] pl-5 flex items-center", {
                    'bg-[#640000]': isOpen
                })}>
                    <h1
                        className={clsx(" text-lg font-bold  ", {
                            'underline text-white': isOpen
                        })} >
                        {title}
                    </h1>
                </div>
                {
                    isOpen ? (
                        <p className='text-justify px-[20px]'>
                            <span className='font-bold'>Ответ: </span>
                            {content}
                        </p>
                    )
                        : null
                }
            </li >
        </>
    )
}
