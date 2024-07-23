import { backendImageUrl } from "@/shared/lib/constants";
import { EditItem, Button, Input } from "@/shared/ui";
import { useState, Fragment, ChangeEvent } from "react";
import { EditCardItemProps, EditCardProps } from "./model/Cards.interface";
import { getTemplatesProps } from "@/shared/lib/utils/GetTempaltesProps";
import { EditFile, EditSection } from "@/app/entities";


export const EditCardItem = ({
  id,
  deleteCard,
  card,
  templateWidgets,
  writeChanges,
}: EditCardItemProps) => {

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
      <EditCardSection card={card} id={id} writeChanges={writeChanges} />
      <EditFile id={id} image={image} setImage={setImage} writeChanges={writeChanges} />
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