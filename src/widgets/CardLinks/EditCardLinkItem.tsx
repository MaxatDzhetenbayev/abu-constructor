'use client';
import { backendImageUrl } from "@/shared/lib/constants";
import { EditItem, Button, Input } from "@/shared/ui";
import { CardsEditModal } from "@/widgets/Cards/CardsEditModal";
import {
  CarouselEditModal,
} from "@/widgets/Carousel/CarouselEditModal";
import { ListEditModal } from "@/widgets/List/ListEditModal";
import { TextEditModal } from "@/widgets/Text/TextEditModal";
import { useState, Fragment } from "react";
import { CardLinkEditModal } from "./CardLinkEditModal";
import { IEditCardLinkProps } from "./Interfaces";
import Image from "next/image";
import { TemplatesSelect } from "@/features";
import { useTemplates } from "@/shared/hooks/useTemplateWidget";
import { TemplateWidgetsList } from "../TempalteWidgetsList/TempalteWidgetsList";
import { EditFile, EditSection } from "@/app/entities";

interface IEditCardLinkItemProps {
  id: string;
  deleteCardLinklItem: () => void;
  cardLinkItem: IEditCardLinkProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  modalVariant?: "dialog" | "card";
}


export const EditCardLinkItem = ({
  id,
  deleteCardLinklItem,
  cardLinkItem,
  modalVariant = "card",
  writeChanges,
}: IEditCardLinkItemProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (cardLinkItem.image) {
      return `${backendImageUrl}${cardLinkItem.image}`;
    } else {
      return "";
    }
  });

  const { isSaved, templates, selectedTemplate, onSelect } =
    useTemplates({
      savedTemplate: cardLinkItem.savedTemplate,
    });

  return (
    <EditItem
      title={"Carousel Item" + id}
      buttons={
        <>
          <Button onClick={deleteCardLinklItem} size={"sm"}>
            Delete
          </Button>
        </>
      }
    >
      {modalVariant === "card" && (
        <TemplatesSelect
          savedTemplate={isSaved ? cardLinkItem.savedTemplate : ""}
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

      <EditCardLinkSection card={cardLinkItem} id={id} writeChanges={writeChanges} />

      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Title Ru"
          type="text"
          value={cardLinkItem.titleRu}
          onChange={(e) => writeChanges(id, "TitleRu", e.target.value)}
        />
        <Input
          label="Title Kz"
          type="text"
          value={cardLinkItem.titleKz}
          onChange={(e) => writeChanges(id, "TitleKz", e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          label="Href Ru"
          type="text"
          value={cardLinkItem.hrefRu}
          onChange={(e) => writeChanges(id, "HRefRu", e.target.value)}
        />
        <Input
          label="Href Kz"
          type="text"
          value={cardLinkItem.hrefKz}
          onChange={(e) => writeChanges(id, "HRefKz", e.target.value)}
        />
      </div>

      {(cardLinkItem.templateWidgets || selectedTemplate) && (
        <TemplateWidgetsList
          id={id}
          saved={cardLinkItem.templateWidgets}
          selectedTemplate={selectedTemplate}
        />
      )}
    </EditItem>
  );
};




const EditCardLinkSection = ({ writeChanges, card, id }: {
  writeChanges: (id: string, field: string, value: string) => void;
  card: IEditCardLinkProps;
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
            label: "Cсылка (ru)",
            value: card.hrefRu,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentRu", value)
          },
          {
            label: "Ссылка (kz)",
            value: card.hrefKz,
            type: "text",
            onChange: (value: string) => writeChanges(id, "contentKz", value)
          }
        ]}
      />
    </>
  )
}