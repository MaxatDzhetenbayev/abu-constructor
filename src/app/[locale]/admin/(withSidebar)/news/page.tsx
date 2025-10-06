"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNews, useNewsById, useUpdateNews } from "@/entities/news";
import { useDeleteNewsById } from "@/entities/news/model/useDeleteNewsById";
import { INews } from "@/entities/news/types/types";
import { CreateNewsButton } from "@/features";
import { locales, LocaleType } from "@/i18n";
import { backendImageUrl } from "@/shared/lib/constants";
import { Button, Input, Modal } from "@/shared/ui";
import JoditEditorComponent from "@/shared/ui/quill-editor";

export default function NewsPage() {
  const { data, isLoading, isError } = useNews({});
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
      reset(data);

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
    formData.append("data", JSON.stringify(formValues));
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit(onSubmit as any)} className="flex flex-col gap-6">
      <section className="">
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
