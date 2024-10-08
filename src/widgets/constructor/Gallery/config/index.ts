import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const GalleryEditOptions: EditOptionsProps = {
  widgetName: "Gallery",
  widgetOptions: [{ props: "title", type: "text", placeholder: "Заголовок" }],
  contentOptions: [
    { props: "image", type: "file", placeholder: "Изображение" },
  ],
};
