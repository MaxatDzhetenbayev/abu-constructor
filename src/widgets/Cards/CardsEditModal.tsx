"use client";
import { WidgetItems } from "@/app/entities/WidgetItems";
import { WidgetTemplateCheckbox } from "@/app/entities/WidgetTemplateCheckbox";
import { WidgetVariantSelect } from "@/app/entities/WidgetVariantSelect";
import { useTemplateWidget } from "@/shared/hooks/useTemplateWidget";
import { BackedPage } from "@/shared/lib/types";
import {
  Button,
  Input,
  WidgetView,
} from "@/shared/ui";
import { EditCardItem, EditCardItemProps } from "@/widgets/Cards/EditCardItem";

interface CardsEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}

export const CardsEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: CardsEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Cards"
      desc="There you can edit Cards content"
      triggerTitle="Редактировать карточки"
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

export type EditCardProps = {
  titleRu: string;
  titleKz: string;
  contentRu: string;
  contentKz: string;
  href?: string;
  image: File | null;
  templateSlug: string;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
};

const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
  modalVariant,
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
    hasTemplate,
    savedTemplate,
    items,
    writeChanges,
    writeMainPropsChanges,
    templates,
    handleTemplate,
    widgetMainProps,
    setSelectedTemplate,
    selectedTemplate,
    setHasTemplate,
  } = useTemplateWidget({
    widgetName: "Cards",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: ["titleRu", "titleKz", "variant"],
    itemsStateFields: ["titleRu", "titleKz", "contentRu", "contentKz", "image"],
  });


  return (
    <>
      <WidgetVariantSelect variant={widgetMainProps.variant} writeFunction={writeMainPropsChanges} />
      <WidgetTemplateCheckbox
        handleTemplate={handleTemplate}
        hasTemplate={hasTemplate}
        modalVariant={modalVariant}
        savedTemplate={savedTemplate}
        setHasTemplate={setHasTemplate}
        setSelectedTemplate={setSelectedTemplate}
        templates={templates}
      />
      <select className="flex flex-col md:flex-row gap-3">
        <Input
          label="Title RU"
          type="text"
          value={widgetMainProps.titleRu}
          onChange={(e) => writeMainPropsChanges("titleRu", e.target.value)}
        />
        <Input
          label="Title KZ"
          type="text"
          value={widgetMainProps.titleKz}
          onChange={(e) => writeMainPropsChanges("titleKz", e.target.value)}
        />
      </select>
      <Button onClick={addItem} className="w-full">
        Добавить новый элемент
      </Button>
      <WidgetItems items={items} ItemComponent={EditCardItem} deleteItem={deleteItem} selectedTemplate={selectedTemplate} writeChanges={writeChanges} />
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
