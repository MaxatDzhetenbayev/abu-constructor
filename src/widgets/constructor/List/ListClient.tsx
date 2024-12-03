"use client";

import { FileArchive, Settings } from "lucide-react";
import { ListItem } from "./ListItem";
import { backendImageUrl } from "@/shared/lib/constants";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEditWidget, useEditWidgetContent } from "@/widgets/common/EditWidget/model";
import { WidgetOptionList } from "@/widgets";
import { EditorMain } from "@/widgets/common/EditWidget/ui";
import { ContentManageModal } from "@/features/Modals/ContentManageModal/ContentManageModal";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/shared/ui/context-menu";

interface ListItem {
  file: string;
  content: string;
}

export interface ListProps {
  items: ListItem[];
}
export function ListClient({
  id,
  contents,
  options: { content },
  locale,
  mode = "production",
}: {
  id: string,
  contents: Array<any>;
  options: any;
  locale: string;
  mode: "development" | "production";
}) {





  return (
    <section className="flex flex-col gap-5  h-full">
      {
        mode === "development"
          ? (<div className="flex gap-3">
            <h2 className="text-3xl font-bold text-[#690000]">
              {content?.[locale]?.title}
            </h2>
            <СontentMainEditModal id={id} />
          </div>) : (
            <h2 className="text-3xl font-bold text-[#690000]">
              {content?.[locale]?.title}
            </h2>
          )
      }
      <ul className="flex flex-col  gap-2">
        {contents.map(({ content }, idx) => (
          <ListItem
            key={idx}
            icon={<FileArchive className="w-7 h-9" />}
            href={`${backendImageUrl}${content.image}`}
            id={id}
            content={content}
            mode={mode}
          >
            <>
              <div>{content[locale].title}</div>
            </>
          </ListItem>
        ))}
      </ul>
    </section>
  );
}




const СontentMainEditModal = ({ id }: { id: string }) => {
  const {
    register,
    control,
    handleSubmit,
    widgetOptions,
  } = useEditWidget(id, WidgetOptionList);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} >
          <Settings className="w-7 h-9" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Главные настройки виджета
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <EditorMain
          control={control}
          handleSubmit={handleSubmit}
          register={register}
          widgetOptions={widgetOptions}
        />
        <DialogFooter className=" gap-2 sm:justify-center">
          <DialogClose asChild>
            Отменить
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export const СontentItemEditModal = ({ id, content }: { id: string, content: any }) => {

  const {
    widget_type,
    widget_variant,
  } = useEditWidget(id, WidgetOptionList);


  const { handleCreateContent, handleUpdateContent } =
    useEditWidgetContent(id);

  console.log(content)

  return (
    <ContentManageModal
      handleCreateContent={handleCreateContent}
      handleUpdateContent={handleUpdateContent}
      action="update"
      contents={content}
      widget_variant={widget_variant}
      id={23}
      widgetOptionsList={WidgetOptionList}
      widget_type={widget_type}
    />
  )
}