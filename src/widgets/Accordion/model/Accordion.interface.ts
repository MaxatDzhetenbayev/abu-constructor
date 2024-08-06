export interface AccordionProps {
    title: string;
    items: AccordionItemProps[];
}

export interface AccordionItemProps {
    title: string;
    content: string;
}