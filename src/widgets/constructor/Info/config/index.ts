import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const InfoEditOptions: EditOptionsProps = {
    widgetName: "Info",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
        { props: "full_name", type: "text", placeholder: "ФИО" },
        { props: "content", type: "quill", placeholder: "Контент" },
        {
            props: "variant",
            type: "select",
            placeholder: "Положение картинки",
            values: [
                { value: "right", label: "Справа" },
                { value: "left", label: "Слева" },
            ],
        },
        { props: "image", type: "file", placeholder: "Изображение" },
    ],
    contentOptions: [],
};