import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";


const mainKeys = ["titleRu", "titleKz"];
const mainInputs = [
    { label: "Заголовок RU", value: "text" },
    { label: "Заголовок KZ", value: "text" },
];

const itemKeys = ["titleRu", "titleKz", "contentRu", "contentKz",];
const itemInputs = [
    { label: "Заголовок RU", value: "text" },
    { label: "Заголовок KZ", value: "text" },
    { label: "Контент RU", value: "text" },
    { label: "Контент KZ", value: "text" },
];

function AccardionEditModal(props: BaseEditModalProps) {
    const modalProps = {
        ...props,
        widgetName: "Accordion",
        cardTitle: "Редактировать аккардион",
        desc: "Здесь вы можете отредактировать виджет аккардиона",
        triggerTitle: "Редактировать элемент аккардиона",
        mainKeys,
        mainInputs,
        itemKeys,
        itemInputs,
        withTemplate: true,
    };
    return <EditModal {...modalProps} />;
};


AccardionEditModal.displayName = "AccordionEditModal";
export default AccardionEditModal;