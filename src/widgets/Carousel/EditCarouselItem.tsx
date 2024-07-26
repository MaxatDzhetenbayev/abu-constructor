import { EditFile, EditSection } from "@/app/entities";
import { TemplatesSelect } from "@/features";
import { useTemplates } from "@/shared/hooks/useTemplateWidget";
import { backendImageUrl } from "@/shared/lib/constants";
import { EditItem, Button } from "@/shared/ui";
import { EditCarouselItemProps } from "@/widgets/Carousel/CarouselEditModal";

import { useState } from "react";
import { TemplateWidgetsList } from "../TempalteWidgetsList/TempalteWidgetsList";

export const EditCarouselItem = ({
  id,
  deleteCarouselItem,
  item,
  writeChanges,
  modalVariant = "card",
}: {
  id: string;
  item: EditCarouselItemProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteCarouselItem: () => void;
  modalVariant?: "card" | "dialog";
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (item.image) {
      return `${backendImageUrl}${item.image}`;
    } else {
      return "";
    }
  });
  const { isSaved, templates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: item.savedTemplate,
    });

  return (
    <EditItem
      title={"Carousel Item" + id}
      buttons={
        <>
          <Button onClick={deleteCarouselItem} size={"sm"}>
            Delete
          </Button>
        </>
      }
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? item.savedTemplate : ""}
          templates={templates}
          onSelect={(template) => {
            onSelect(template, (w) => {
              writeChanges(id, "templateWidgets", JSON.stringify(w.widgets));
              writeChanges(id, "savedTemplate", w.name);
            });
          }}
        />
      )}
      <EditFile id={id} image={image} setImage={setImage} writeChanges={writeChanges} />

      <EditCarouselSection carouselItem={item} id={id} writeChanges={writeChanges} />
      {(item.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={item.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItem>
  );
};




const EditCarouselSection = ({ writeChanges, carouselItem, id }: {
  writeChanges: (id: string, field: string, value: string) => void;
  carouselItem: EditCarouselItemProps;
  id: string;
}) => {
  return (
    <>
      <EditSection
        inputList={[
          {
            label: "Заголовок карточки(ru)",
            value: carouselItem.contentRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleRu", value)
          },
          {
            label: "Заголовок карточки(kz)",
            value: carouselItem.contentKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleKz", value)
          }
        ]}
      />
    </>
  )
}