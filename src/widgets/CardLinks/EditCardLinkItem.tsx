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

export const EditCardLinkItem = ({
  id,
  deleteCardLinklItem,
  cardLinkItem,
  templateWidgets,
  writeChanges,
}: {
  id: string;
  cardLinkItem: IEditCardLinkProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  templateWidgets?: string[];
  deleteCardLinklItem: () => void;
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (cardLinkItem.image) {
      return `${backendImageUrl}${cardLinkItem.image}`;
    } else {
      return "";
    }
  });

  const getTemplatesProps = (w: string, order: number, baseProps: any) => {
    switch (w) {
      case "Cards":
        return <CardsEditModal variant="dialog" {...baseProps} />;
      case "Carousel":
        return <CarouselEditModal variant="dialog" {...baseProps} />;
      case "List":
        return <ListEditModal variant="dialog" {...baseProps} />;
      case "Text":
        return <TextEditModal variant="dialog" {...baseProps} />;
      case "CardLinks":
        return <CardLinkEditModal variant="dialog" {...baseProps} />;
      default:
        return null;
    }
  };

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
      <Input
        type="file"
        label="Image"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
              if (event.target) setImage(event.target.result);
            };
            reader.readAsDataURL(file);

            writeChanges(id, "image", file);
          }
        }}
      />

      {image && <img className="w-20 h-20" src={image as string} alt="image" />}

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

      {templateWidgets && (
        <div className="flex flex-col gap-3 ">
          <span>Настройки шаблона</span>
          {templateWidgets?.map((w, idx) => {
            const baseProps = {
              order: idx,
              ruPageId: +id.split("*")[0],
              kzPageId: +id.split("*")[1],
              queryKey: "getTemplateWidgets",
            };

            return (
              <Fragment key={idx}>
                {getTemplatesProps(w, idx, baseProps)}
              </Fragment>
            );
          })}
        </div>
      )}
    </EditItem>
  );
};
