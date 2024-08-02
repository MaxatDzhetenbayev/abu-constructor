import React, { ReactNode } from 'react'
import { AccardionProps } from './model/Accardion.interface';
import { AccardionItem } from './AccardionItem';

export const Accardion = ({ items, title }: AccardionProps): ReactNode => {

    const variant = {
        open: {
            style: { borderColor: "var(--main-color)" },
            borderColor: "var(--main-color)",
            height: "auto",
            padding: "0px 20px",
        },
        closed: {
            borderColor: "transparent",
            height: 0,
            padding: "0px 20px",
            overflow: "hidden",
        },
    };

    return (
        <section>
            <h1 className='text-2xl font-bold'>
                {title}
            </h1>
            <ul className='pt-5'>
                {items.map((item) => (
                    <AccardionItem key={item.title} title={item.title} content={item.content} />
                ))}
            </ul>
        </section>
    )
}
