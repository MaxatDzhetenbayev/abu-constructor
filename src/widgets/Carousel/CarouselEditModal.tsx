import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const itemKeys = ["titleRu", "titleKz", "contentRu", "contentKz", "image"];
const itemInputs = [
    { label: "Заголовок RU", value: "text" },
    { label: "Заголовок KZ", value: "text" },
    { label: "Контент RU", value: "text" },
    { label: "Контент KZ", value: "text" },
    { label: "Контент KZ", value: "text" },
    { value: "file" },
];

export const CarouselEditModal = (props: BaseEditModalProps) => {
    const modalProps = {
        ...props,
        widgetName: "Carousel",
        cardTitle: "Редактировать элементы",
        desc: "Здесь вы можете отредактировать виджет карусель",
        triggerTitle: "Редактировать карусель",
        mainKeys: ["variant", "perView", "titleRu", "titleKz"],
        mainInputs: [
            {
                value: "select",
                select: {
                    placeholder: "Размер Слайдера",
                    values: [
                        { value: "small", label: "Маленький" },
                        { value: "medium", label: "Средний" },
                        { value: "large", label: "Большой" },
                    ],
                },
            },
            {
                value: "select",
                select: {
                    placeholder: "Количество видимых слайдов",
                    values: [
                        { value: "1", label: "Один" },
                        { value: "2", label: "Два" },
                        { value: "3", label: "Три" },
                    ],
                },
            },
            { label: "Заголовок RU", value: "text" },
            { label: "Заголовок KZ", value: "text" },
        ],
        itemKeys,
        itemInputs,
        withTemplate: true,
    };
    return <EditModal {...modalProps} />;
};