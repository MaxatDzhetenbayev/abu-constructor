import React, { useEffect } from "react";

import Link from "next/link";
import { DeleteIcon, Loader2, Settings } from "lucide-react";

import { useNavigationPageContent } from "./model/useNavigationPageContent";
import { handleDragEnd } from "./lib";

import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/shared/ui";
import { IWidget } from "@/shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { backendUrl } from "@/shared/lib/constants";
import { useForm } from "react-hook-form";
import { locales } from "@/i18n";
import { INavigation } from "@/shared/lib/types";
import { toast } from "@/shared/ui/use-toast";
import { queryClient } from "@/shared/lib/client";

export const NavigationPageItems = ({
  trans,
  id,
}: {
  trans: any;
  id: string;
}) => {
  const { handleDragStart, handleDrop } =
    useDragAndDrop<IWidget>(handleDragEnd);

  const { widgets, isFetching, handleWidgetDelete, handleWidgetUpdate } =
    useNavigationPageContent(id);

  const { reset,
    handleSubmit,
    register,
  } = useForm({

  })

  const { data: navigationItem, isSuccess, isLoading } = useQuery<INavigation>({
    queryKey: ["get-navigations", id],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/navigations/${id}`)
      return res.json()
    },
    enabled: !!id
  })

  const { mutate: fetchUpdateNavigation } = useMutation({
    mutationKey: ["update-navigations", id],
    mutationFn: async (data: Partial<INavigation>) => {
      const res = await fetch(`${backendUrl}/navigations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-navigations", id]
      })
      toast({ title: "Настройки", description: "Настройки навигации были изменены " })
    }
  })

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const { title, slug } = navigationItem
      reset({ title, slug })
    }
  }, [navigationItem, isLoading])

  return (
    <section className="flex grow bg-slate-500 flex-col gap-3  p-3">
      <h2 className="text-center mb-2 text-white font-bold">
        {trans("rightTitle")}
      </h2>
      {
        isSuccess && navigationItem.navigation_type === "detail" && (
          <section>
            <form onSubmit={handleSubmit((data) => fetchUpdateNavigation(data))}>
              <section className="flex gap-3">
                {locales.map((locale, idx) => (
                  <Input
                    key={idx}
                    {...register(`title.${locale}`)}
                    label={`Название на ${locale} `}
                  />
                ))}
              </section>
              {/* <Input
                {...register("slug")}
                label="slug страницы"
              /> */}
              <Button type="submit" className="w-full">Сохранить</Button>
            </form>
          </section>
        )
      }
      <section>
        {isFetching && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin w-10 h-10 align-middle" />
          </div>
        )}
        {widgets?.length === 0 ? (
          <section className="flex justify-center items-center">
            <h1>В этой странице нет контента</h1>
          </section>
        ) : (
          <ul className="flex flex-col gap-2">
            {widgets?.map((widget) => (
              <li
                key={widget.id}
                className="flex justify-between items-center gap-2 rounded-sm px-5 py-3 bg-slate-100 cursor-grab"
                draggable
                onDragStart={(e) => handleDragStart(e, widget)}
                onDrop={(e: React.DragEvent<HTMLLIElement>) =>
                  handleDrop(e, widget, handleWidgetUpdate)
                }
                onDragOver={(e) => e.preventDefault()}
              >
                <span>{widget.widget_type}</span>
                <section className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={"sm"} >
                        <DeleteIcon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm sm:max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>
                          Вы точно хотите удалить этот виджет?
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
                        <Button onClick={() => handleWidgetDelete(widget.id)}
                        // loading={isPending} disabled={isPending}
                        >
                          Удалить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Link
                    className="bg-[#640000] text-white text-center rounded-md p-2"
                    href={{ pathname: `${id}/widget/${widget.id}` }}
                  >
                    <Settings />
                  </Link>
                </section>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
