import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const GalleryEditOptions: EditOptionsProps = {
  widgetName: "Gallery",
  widgetOptions: [{ props: "title", type: "text", placeholder: "Заголовок" },
  {
    props: "variant",
    type: "select",
    placeholder: "Вид галереи",
    values: [
      { value: "cards", label: "Карточный" },
      { value: "slider", label: "Слайдер" },
    ],
  }],
  contentOptions: [
    { props: "image", type: "file", placeholder: "Изображение" },
  ],
};
