import { backendImageUrl } from "@/shared/lib/constants";
import { EditItem, Button, Input } from "@/shared/ui";
import { useState, Fragment, ChangeEvent } from "react";
import { EditCardItemProps, EditCardProps } from "./model/Cards.interface";
import { getTemplatesProps } from "@/shared/lib/utils/GetTempaltesProps";
import { EditFile, EditSection } from "@/app/entities";
import { TemplatesSelect } from "@/features";
import { useTemplates } from "@/shared/hooks/useTemplateWidget";
import { TemplateWidgetsList } from "../TempalteWidgetsList/TempalteWidgetsList";


export const EditCardItem = ({
  id,
  deleteCard,
  card,
  templateWidgets,
  writeChanges,
  modalVariant = "card",
}: EditCardItemProps) => {
  const { isSaved, templates, setTemplates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: card.savedTemplate,
    });

  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (card.image) {
      return `${backendImageUrl}${card.image}`;
    } else {
      return "";
    }
  });

  return (
    <EditItem
      buttons={
        <>
          <Button onClick={deleteCard}>Удалить</Button>
        </>
      }
      title={"Card" + id}
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? card.savedTemplate : ""}
          templates={templates}
          onSelect={(template) => {
            onSelect(template, (w) => {
              writeChanges(id, "templateWidgets", JSON.stringify(w.widgets));
              writeChanges(id, "savedTemplate", w.name);
            });
          }}
        />
      )}
      <EditCardSection card={card} id={id} writeChanges={writeChanges} />
      <EditFile id={id} image={image} setImage={setImage} writeChanges={writeChanges} />
      {(card.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={card.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItem>
  );
};


const EditCardSection = ({ writeChanges, card, id }: {
  writeChanges: (id: string, field: string, value: string) => void;
  card: EditCardProps;
  id: string;
}) => {
  return (
    <>
      <EditSection
        inputList={[
          {
            label: "Заголовок карточки(ru)",
            value: card.titleRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleRu", value)
          },
          {
            label: "Заголовок карточки(kz)",
            value: card.titleKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "titleKz", value)
          }
        ]}
      />
      <EditSection
        inputList={[
          {
            label: "Содержание карточки(ru)",
            value: card.contentRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentRu", value)
          },
          {
            label: "Содержание карточки(kz)",
            value: card.contentKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentKz", value)
          }
        ]}
      />
    </>
  )
}