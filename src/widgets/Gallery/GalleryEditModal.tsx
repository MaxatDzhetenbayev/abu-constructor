import { BaseEditModalProps } from "@/shared/lib/types";
import { EditModal } from "@/widgets/EditModal/EditModal";
const itemKeys = ["image"];
const itemInputs = [{ label: "Картинка", value: "file" }];

export const GalleryEditModal = (props: BaseEditModalProps) => {
  const modalProps = {
    ...props,
    widgetName: "Gallery",
    cardTitle: "Редактировать галлерею",
    desc: "Здесь вы можете отредактировать виджет галлерею",
    triggerTitle: "Редактировать галлерею",
    mainKeys: [],
    mainInputs: [],
    itemKeys,
    itemInputs,
    withTemplate: false,
  };
  return <EditModal {...modalProps} />;
};