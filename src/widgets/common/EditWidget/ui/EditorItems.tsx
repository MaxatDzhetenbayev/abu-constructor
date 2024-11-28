import { IContent } from "@/shared/types";
import React from "react";
import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { handleDragEnd } from "../lib";
import { useMutation } from "@tanstack/react-query";
import { IContentUpdateOrderOptions } from "../model/types";
import { backendUrl } from "@/shared/lib/constants";
import { queryClient } from "@/shared/lib/client";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui";
import { DeleteIcon } from "lucide-react";

interface EditorItemProps {
  contents: IContent[] | undefined;
  CreateButton: any;
  EditButton: any;
}

export const EditorItems = ({
  contents,
  CreateButton,
  EditButton,
}: EditorItemProps) => {

  const { handleDragStart, handleDrop } = useDragAndDrop(handleDragEnd)


  const { mutate: handleContentOrderUpdate } = useMutation({
    mutationFn: async (
      options: IContentUpdateOrderOptions[]
    ) => {
      const response = await fetch(`${backendUrl}/contents/orders/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
      return response.json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents"],
      });
    },
  });


  const { mutate: handleDeleteItem } = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${backendUrl}/contents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents"],
      });
    }
  })


  return (
    <section className="mt-7">
      <h1 className="block font-bold text-center mb-4">Настройки контента</h1>
      {CreateButton}
      <ul className="mt-4 flex flex-col gap-3"
      >
        {contents?.map((content, idx) => (
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, content)}
            onDrop={(e: React.DragEvent<HTMLLIElement>) =>
              handleDrop(e, content, handleContentOrderUpdate)
            }
            onDragOver={(e) => e.preventDefault()}
            key={content.id}
            className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
          >
            <p>Элемент - #{content.id}</p>
            <div className="flex items-center gap-2">
              {EditButton(content.content, content.id)}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"sm"} >
                    <DeleteIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>
                      Вы точно хотите удалить этот элемент?
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <DialogFooter className=" gap-2 sm:justify-center">
                    <DialogClose asChild>
                      <Button

                        // ref={closeRef} 
                        type="button" variant="secondary">
                        Отменить
                      </Button>
                    </DialogClose>
                    <Button onClick={() => { handleDeleteItem(content.id) }}
                    // loading={isPending} disabled={isPending}
                    >
                      Удалить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
