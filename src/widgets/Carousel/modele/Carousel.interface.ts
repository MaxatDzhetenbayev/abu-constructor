export interface CarouselProps {
    title: string;
    perView: "1" | "2" | "3";
    variant: "small" | "medium" | "large";
    items: CarouselItemType[];
}

export interface CarouselItemType {
    title: string;
    content: string;
    image: string;
    href?: string;
}