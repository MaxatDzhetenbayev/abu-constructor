import { Plus } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { ICreateNewsFormData } from "@/entities/news/types/types";
import { locales } from "@/i18n";
import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";
import { Button, Input, Modal } from "@/shared/ui";
import JoditEditorComponent from "@/shared/ui/quill-editor";
import { toast } from "@/shared/ui/use-toast";

import { useMutation } from "@tanstack/react-query";

export const CreateNewsButton = () => {
  return (
    <Modal isWfull={true} modalSlot={<CreateNewsModal />}>
      <Button size={"sm"}>
        <Plus />
      </Button>
    </Modal>
  );
};

const CreateNewsModal = () => {
  const { register, handleSubmit, control, reset } =
    useForm<ICreateNewsFormData>();

  const onSubmit = (data: ICreateNewsFormData) => {
    // Если дата не выбрана, не отправляем createdAt
    if (data.createdAt) {
      // Конвертируем локальную дату в ISO строку
      const date = new Date(data.createdAt);
      data.createdAt = date.toISOString();
    }
    mutate({ data });
  };

  const { mutate } = useMutation({
    mutationFn: async ({ data }: { data: ICreateNewsFormData }) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      locales.forEach((locale) => {
        const inputElement = document.getElementById(
          locale
        ) as HTMLInputElement;
        if (inputElement && inputElement.files) {
          Array.from(inputElement.files).forEach((file) => {
            formData.append(`${locale}`, file);
          });
        }
      });

      const res = await fetch(`${backendUrl}/news`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка при обновлении");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      reset(); // Очищаем форму
      toast({
        title: "Новость создана",
        description: "Новость успешно создана.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать новость.",
      });
    },
  });

  return (
    <section className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-3 border p-5">
          <h2>Заголовок</h2>
          <section className="w-full grid gap-3 grid-cols-1 xl:grid-cols-3">
            {locales.map((locale) => (
              <Input
                key={locale}
                label={"Заголовок" + ` (${locale})`}
                {...register(`title.${locale}`)}
              />
            ))}
          </section>
        </section>

        {/* Дата создания */}
        <section className="flex flex-col gap-3 border p-5">
          <h2>Дата создания</h2>
          <section className="w-full">
            <Input
              type="datetime-local"
              label="Дата и время создания (необязательно)"
              {...register("createdAt")}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Если не указать, будет использована текущая дата и время
            </p>
          </section>
        </section>

        {/* текст */}
        <section className="flex flex-col gap-3 border p-5">
          <h2>Текст</h2>
          <section className="grid gap-3 grid-cols-1 xl:grid-cols-3">
            {locales.map((locale) => (
              <Controller
                key={locale}
                name={`content.${locale}.description`}
                control={control}
                render={({ field }) => (
                  <JoditEditorComponent
                    key={locale}
                    label={`Текст` + ` (${locale})`}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ))}
          </section>
        </section>

        {/* Изображения */}
        <section className="flex flex-col gap-3 border p-5">
          <h2>Изображения</h2>
          <section className="grid gap-3 grid-cols-1 xl:grid-cols-3">
            {locales.map((locale) => (
              <div key={locale} className="mt-5">
                <label>{`Загрузить изображения (${locale})`}</label>
                <input type="file" id={locale} name={locale} multiple />
              </div>
            ))}
          </section>
        </section>
        <Button type="submit">Создать</Button>
      </form>
    </section>
  );
};
