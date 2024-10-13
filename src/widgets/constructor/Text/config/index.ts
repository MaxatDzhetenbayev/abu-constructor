import { EditOptionsProps } from "@/widgets/common/EditWidget/model/types";

export const TextEditOptions: EditOptionsProps = {
  widgetName: "Text",
  widgetOptions: [
    { props: "title", type: "text", placeholder: "Заголовок" },
    {
      props: "title_view", type: "select",
      placeholder: "Показывать",
      values: [
        { value: true, label: "Да" },
        { value: false, label: "Нет" },
      ],
      defaultValue: true,
    },
    { props: "content", type: "quill", placeholder: "Контент" },
  ],
  contentOptions: [],
};
