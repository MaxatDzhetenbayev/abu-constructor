import { CardsEditModal, CarouselEditModal, ListEditModal, TextEditModal, CardLinkEditModal } from "@/widgets";

export const getTemplatesProps = (w: string, order: number, baseProps: any) => {
    switch (w) {
        case "Cards":
            return <CardsEditModal variant="dialog" {...baseProps} />;
        case "Carousel":
            return <CarouselEditModal variant="dialog" {...baseProps} />;
        case "List":
            return <ListEditModal variant="dialog" {...baseProps} />;
        case "Text":
            return <TextEditModal variant="dialog" {...baseProps} />;
        case "CardLinks":
            return <CardLinkEditModal variant="dialog" {...baseProps} />;
        default:
            return null;
    }
};