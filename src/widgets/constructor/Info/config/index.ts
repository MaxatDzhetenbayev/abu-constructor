import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const InfoEditOptions: EditOptionsProps = {
    widgetName: "Info",
    widgetOptions: [
        { props: "title", type: "text", placeholder: "Заголовок" },
        { props: "full_name", type: "text", placeholder: "ФИО" },
        { props: "post", type: "text", placeholder: "Должность/Звание" },
        { props: "content", type: "quill", placeholder: "Контент" },
        { props: "image", type: "file", placeholder: "Изображение" },
    ],
    contentOptions: [],
};