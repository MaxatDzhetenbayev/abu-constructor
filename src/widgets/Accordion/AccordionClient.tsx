import React, { ReactNode } from 'react'
import { AccordionProps } from './model/Accordion.interface';
import { AccardionItem } from './AccordionItem';

export function AccordionClient({ items, title }: AccordionProps): ReactNode {

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


