import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const CardEditOptions: EditOptionsProps = {
  widgetName: "Cards",
  widgetOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    {
      props: "variant",
      type: "select",
      placeholder: "Вид карточек",
      values: [
        { value: "base", label: "Стандарт" },
        { value: "horizontal", label: "Горизонтальный" },
        { value: "with_modal", label: "С модальным окном" },
        { value: "with_file", label: "С прикреплением файла " },
      ],
    },
    {
      props: "count_of_row",
      type: "select",
      placeholder: "Количество карточек в строке",
      values: [
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
      ],
    },
    {
      props: "size",
      type: "select",
      placeholder: "Размер",
      values: [
        { value: "normal", label: "Стандартный" },
        { value: "medium", label: "Средний" },
        { value: "large", label: "большой" },
      ],
    },
  ],
  contentOptions: (variant) => {
    switch (variant) {
      case "base":
      case "horizontal":
      case "with_modal":
        return [
          { props: "title", type: "text", placeholder: "Заголовок" },
          { props: "content", type: "quill", placeholder: "Описание" },
          { props: "image", type: "file", placeholder: "Изображение" },
        ];
      case "with_file":
        return [
          { props: "title", type: "text", placeholder: "Заголовок" },
          { props: "content", type: "quill", placeholder: "Описание" },
          { props: "image", type: "file", placeholder: "Изображение" },
          { props: "file", type: "file", placeholder: "Файл" },
        ];

      default:
        return [
          { props: "title", type: "text", placeholder: "Заголовок" },
          { props: "content", type: "quill", placeholder: "Описание" },
          { props: "image", type: "file", placeholder: "Изображение" },
        ];
    }
  }
};
