'use client';
import React, { ReactNode, useState } from 'react'
import { motion } from "framer-motion";
import clsx from 'clsx';
import { AccardionItemProps } from './model/Accardion.interface';
import { animateOptions } from './model/Accardion.consts';


export const AccardionItem = ({ title, content }: AccardionItemProps): ReactNode => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.li
            onClick={() => setIsOpen(!isOpen)}
            className={clsx("flex flex-col gap-3 cursor-pointer")}>
            <motion.div
                {...animateOptions.itemVariants}
                animate={isOpen ? "open" : "closed"}
                className={clsx("rounded-[10px] shadow-[0px_4px_23.5px_4px_rgba(0,0,0,0.11)] min-h-[90px] pl-5 flex items-center", {
                })}>
                <h1
                    className={clsx(" text-lg font-bold  ", {
                        'underline text-white': isOpen
                    })} >
                    {title}
                </h1>
            </motion.div>
            <motion.div className='text-justify px-[20px]'
                {...animateOptions.contentVariants}
                animate={isOpen ? "open" : "closed"}
            >
                <p>
                    <span className='font-bold'>Ответ: </span>
                    {content}
                </p>
            </motion.div>
        </motion.li >
    )
}
