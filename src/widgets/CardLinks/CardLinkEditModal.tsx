import React from "react";
import { useTemplateWidget } from "@/shared/hooks/useTemplateWidget";
import {
  Button,
  WidgetView,
} from "@/shared/ui";
import { EditCardLinkItem } from "./EditCardLinkItem";
import { WidgetItems } from "@/app/entities";

interface EditProps {
  variant?: "card" | "dialog";
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
}

export const CardLinkEditModal = ({
  kzPageId,
  order,
  queryKey,
  ruPageId,
  variant = "card",
}: EditProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Настройки карточка&ссылка"
      desc="Здесь вы можете редактировать содержимое карточки&ссылки"
      triggerTitle="Редактировать карточки&ссылки"
      content={
        <ModalContent
          modalVariant={variant}
          ruPageId={ruPageId}
          kzPageId={kzPageId}
          order={order}
          queryKey={queryKey}
        />
      }
    />
  );
};

export const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
  modalVariant = "card",
}: {
  modalVariant?: "dialog" | "card";
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
  order: number;
}) => {
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
    widgetName: "CardLinks",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: ["TitleRu", "TitleKz", "image", "HRefRu", "HRefKz", "savedTemplate", "templateWidgets"],
  });

  return (
    <>
      <Button onClick={addItem} className="w-full">
        Добавить новый элемент
      </Button>
      <WidgetItems items={items} ItemComponent={EditCardLinkItem} deleteItem={deleteItem} writeChanges={writeChanges} />
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
