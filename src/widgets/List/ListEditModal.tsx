"use client";
import {
  Button,
  EditItem,
  Input,
  WidgetView,
} from "@/shared/ui";
import { DeleteIcon } from "lucide-react";
import { backendImageUrl } from "@/shared/lib/constants";
import { useTemplateWidget } from "@/shared/hooks/useTemplateWidget";
import { WidgetItems } from "@/app/entities";

type EditListItemProps = {
  contentRu: string;
  contentKz: string;
  file: File | null | string;
};

interface ListEditModalProps {
  variant?: "card" | "dialog";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}

export const ListEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: ListEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit List"
      desc="There you can edit List content"
      triggerTitle="Редактировать лист"
      content={
        <ModalContent
          variant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};
const ModalContent = ({
  queryKey,
  ruPageId,
  kzPageId,
  order,
}: ListEditModalProps) => {

  const {
    addItem,
    deleteItem,
    onEdit,
    onSave,
    props,
    loading,
    setLoading,
    items,
    writeChanges,
  } = useTemplateWidget({
    widgetName: "List",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: ["contentRu", "contentKz", "image", "savedTemplate", "templateWidgets"],
  });

  return (
    <>
      <Button className="w-full" onClick={() => addItem()}>
        Add new List item
      </Button>
      <WidgetItems items={items} ItemComponent={EditListItem} deleteItem={deleteItem} writeChanges={writeChanges} />
      <Button
        loading={loading}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          props ? onEdit() : onSave();
        }}
      >
        Сохранить
      </Button>
    </>
  );
};

const EditListItem = ({
  id,
  listItem,
  deleteListItem,
  writeChanges,
}: {
  id: string;
  listItem: EditListItemProps;
  writeChanges: (id: string, field: string, value: string | File) => void;
  deleteListItem: () => void;
}) => {
  return (
    <EditItem
      title={"List " + id}
      buttons={
        <>
          <Button onClick={deleteListItem} size={"sm"}>
            <DeleteIcon />
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <Input
          label="Content RU"
          type="text"
          value={listItem.contentRu}
          onChange={(e) => writeChanges(id, "contentRu", e.target.value)}
        />
        <Input
          label="Content KZ"
          type="text"
          value={listItem.contentKz}
          onChange={(e) => writeChanges(id, "contentKz", e.target.value)}
        />
      </div>
      {listItem.file && (
        <a
          href={`${backendImageUrl}${listItem.file as string}`}
          target="_blank"
          className="text-lg"
        >
          Посмотреть прикрепленный файл
        </a>
      )}
      <Input
        type="file"
        label="Document"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            writeChanges(id, "file", file);
          }
        }}
      />
    </EditItem>
  );
};
