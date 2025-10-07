"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNews, useNewsById, useUpdateNews } from "@/entities/news";
import { useDeleteNewsById } from "@/entities/news/model/useDeleteNewsById";
import { INews, newsSource } from "@/entities/news/types/types";
import { CreateNewsButton } from "@/features";
import { locales, LocaleType } from "@/i18n";
import { backendImageUrl } from "@/shared/lib/constants";
import { Button, Input, Modal } from "@/shared/ui";
import JoditEditorComponent from "@/shared/ui/quill-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export default function NewsPage() {
  const { data, isLoading, isError } = useNews({ source: newsSource.ALL });
  return (
    <section>
      <section>
        <CreateNewsButton />
        {isLoading && <p>Загрузка...</p>}
        {isError && <p>Ошибка загрузки</p>}
        {data?.items && (
          <ul className="flex flex-col gap-4">
            {data.items.map((n) => (
              <NewsItem key={n.id} {...n} />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

const NewsItem = (n: INews) => {
  const lang = useParams().locale as LocaleType[number];
  const { mutate } = useDeleteNewsById(n.id);

  return (
    <section className="flex gap-5">
      <Modal
        key={n.id}
        modalSlot={<NewsModalContent news={n} />}
        headerSlot={<h1 className="text-calc-xl">Редактирование новости</h1>}
        isWfull
      >
        <Button className="flex-1">
          <h2>{n.title[lang]}</h2>
        </Button>
      </Modal>
      <Button onClick={() => mutate()}>
        <h2>Удалить</h2>
      </Button>
    </section>
  );
};

const NewsModalContent = ({ news: { id } }: { news: Pick<INews, "id"> }) => {
  const { data, isLoading, isError } = useNewsById(id);
  const { register, reset, control, handleSubmit } = useForm();
  const [keptImages, setKeptImages] = useState<Record<string, string[]>>({});
  const [newFiles, setNewFiles] = useState<Record<string, File[]>>({});
  const updateMutation = useUpdateNews();

  useEffect(() => {
    if (data) {
      const formatDateTimeLocal = (input: string | Date) => {
        const date = new Date(input);
        const pad = (n: number) => String(n).padStart(2, "0");
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      const preparedData = {
        ...data,
        createdAt: data.createdAt
          ? formatDateTimeLocal(data.createdAt)
          : undefined,
      };

      reset(preparedData);

      const initialImages = Object.fromEntries(
        locales.map((locale) => [locale, data.content?.[locale]?.images || []])
      );
      setKeptImages(initialImages);
    }
  }, [data]);

  const handleFileChange = (locale: string, files: FileList | null) => {
    if (!files) return;
    setNewFiles((prev) => ({
      ...prev,
      [locale]: [...(prev[locale] || []), ...Array.from(files)],
    }));
  };

  const handleRemoveImage = (locale: string, file: string) => {
    setKeptImages((prev) => ({
      ...prev,
      [locale]: (prev[locale] || []).filter((f) => f !== file),
    }));
  };

  const onSubmit = async (formValues: never) => {
    const formData = new FormData();
    // удаляем createdAt, если пустой
    const payload = { ...(formValues as Record<string, unknown>) };
    if (!payload.createdAt) {
      delete payload.createdAt;
    }
    formData.append("data", JSON.stringify(payload));
    formData.append("imagesToKeep", JSON.stringify(keptImages));

    for (const locale of locales) {
      const files = newFiles[locale] || [];
      for (const file of files) {
        formData.append(locale, file);
      }
    }

    await updateMutation.mutateAsync({ id, formData });
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (isError || !data) return <p>Ошибка загрузки</p>;

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={handleSubmit(onSubmit as any)}
      className="flex flex-col gap-6"
    >
      <section className="">
        {/* Дата и источник */}
        <section className="border p-4">
          <h2>Дата и источник</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <div>
              <Input
                type="datetime-local"
                label="Дата и время создания"
                {...register("createdAt")}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm">Источник</label>
              <Controller
                name="source"
                control={control}
                defaultValue={data.source}
                render={({ field }) => (
                  <Select
                    value={field.value ?? data.source}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={newsSource.ABU}>
                        Для сайта abu.edu
                      </SelectItem>
                      <SelectItem value={newsSource.AI}>
                        Для сайта ai.abu.edu
                      </SelectItem>
                      <SelectItem value={newsSource.ALL}>
                        Для всех сайтов
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </section>
        {/* Заголовок */}
        <section className="border p-4">
          <h2>Заголовок</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {locales.map((locale) => (
              <Input
                key={locale}
                label={`Заголовок (${locale})`}
                {...register(`title.${locale}`)}
              />
            ))}
          </div>
        </section>

        {/* Текст */}
        <section className="border p-4">
          <h2>Текст</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
            {locales.map((locale) => (
              <Controller
                key={locale}
                name={`content.${locale}.description`}
                control={control}
                render={({ field }) => (
                  <JoditEditorComponent
                    label={`Текст (${locale})`}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ))}
          </div>
        </section>

        {/* Изображения */}
        <section className="border p-4">
          <h2>Изображения</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {locales.map((locale) => (
              <div key={locale}>
                <label className="font-medium block mb-1">
                  Загрузить изображения ({locale})
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(locale, e.target.files)}
                />
                <div className="mt-2 flex flex-col gap-2">
                  {(keptImages[locale] || []).map((file) => (
                    <div key={file} className="flex items-center gap-2">
                      <Link
                        href={backendImageUrl + file}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        {file}
                      </Link>
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={() => handleRemoveImage(locale, file)}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <Button type="submit" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? "Сохраняю..." : "Сохранить"}
      </Button>
    </form>
  );
};
