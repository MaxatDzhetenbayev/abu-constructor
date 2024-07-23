"use client";
import { WidgetTemplateCheckbox } from "@/app/entities/WidgetTemplateCheckbox";
import { WidgetVariantSelect } from "@/app/entities/WidgetVariantSelect";
import { TemplatesSelect } from "@/features";
import { useTemplateWidget } from "@/shared/hooks/useTemplateWidget";
import { BackedPage } from "@/shared/lib/types";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  WidgetView,
} from "@/shared/ui";
import { EditCardItem } from "@/widgets/Cards/EditCardItem";

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
      <div className="flex flex-col md:flex-row gap-3">
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
      </div>
      <Button onClick={addItem} className="w-full">
        Добавить новый элемент
      </Button>
      <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
        {Object.keys(items).map((key, idx) => (
          <EditCardItem
            writeChanges={writeChanges}
            card={items[key]}
            deleteCard={() => deleteItem(key)}
            key={idx}
            id={key}
            templateWidgets={
              selectedTemplate ? selectedTemplate.widgets : undefined
            }
          />
        ))}
      </section>
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
