"use client";
import { WidgetItems } from "@/app/entities";
import { useTemplateWidget } from "@/shared/hooks/useTemplateWidget";
import {
  BackedPage,
} from "@/shared/lib/types";
import {
  Button,

  WidgetView,
} from "@/shared/ui";
import { EditCarouselItem } from "@/widgets/Carousel/EditCarouselItem";
export type EditCarouselItemProps = {
  contentRu: string;
  templateSlug: string;
  savedTemplate: string;
  templateWidgets: string;
  contentKz: string;
  image: File | null;
  href?: string;
  page?: {
    ru: BackedPage;
    kz: BackedPage;
  };
};
interface CarouselEditModalProps {
  variant?: "dialog" | "card";
  order: number;
  ruPageId: number | null;
  kzPageId: number | null;
  queryKey: string;
}
export const CarouselEditModal = ({
  variant = "card",
  order,
  ruPageId,
  kzPageId,
  queryKey,
}: CarouselEditModalProps) => {
  return (
    <WidgetView
      variant={variant}
      cardTitle="Edit Carousel"
      desc="There you can edit Carousel content"
      triggerTitle="Редактировать карусель"
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
const ModalContent = ({
  ruPageId,
  kzPageId,
  order,
  queryKey,
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
    widgetName: "Carousel",
    ruPageId,
    kzPageId,
    queryKey,
    order,
    widgetStateFields: [],
    itemsStateFields: ["contentRu", "contentKz", "image", "savedTemplate", "templateWidgets"],
  });
  console.log(items);
  return (
    <>
      <Button onClick={addItem} className="w-full">
        Добавить новый элемент
      </Button>
      <WidgetItems items={items} ItemComponent={EditCarouselItem} deleteItem={deleteItem} writeChanges={writeChanges} />
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