"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useNews, useNewsbyId } from "@/entities/news";
import { INews } from "@/entities/news/model/types";
import { LocaleRecordType, locales, LocaleType } from "@/i18n";
import { Button, Input, Modal } from "@/shared/ui";
import QuillEditor from "@/shared/ui/quill-editor";

export default function NewsPage() {
  const lang = useParams().locale as LocaleType[number];
  const { data, isLoading, isError } = useNews({});


  return (
    <section>
      <section>
        {isLoading && <p>Загрузка...</p>}
        {isError && <p>Ошибка загрузки</p>}
        {data?.items && (
          <ul className="flex flex-col gap-4">
            {data.items.map((n) => (
              <Modal
                key={n.id}
                modalSlot={<NewsModalContent news={n} />}
                headerSlot={
                  <h1 className="text-calc-xl">Редактирование новости</h1>
                }
                isWfull
              >
                <Button>
                  <h2>{n.title[lang]}</h2>
                </Button>
              </Modal>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

const NewsModalContent = ({ news: { id } }: { news: Pick<INews, "id"> }) => {
  const { data, isLoading, isError } = useNewsbyId(id);

  const { register, reset, control, handleSubmit } = useForm();
  const [uploadedFiles, setUploadedFiles] = useState<LocaleRecordType<File[]>>({
    ru: [],
    en: [],
    kz: [],
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, locale: LocaleType[number]) => {
    const files = Array.from(e.target.files || []);

    setUploadedFiles((prev) => ({
      ...prev,
      [locale]: [...prev[locale], ...files],
    }));

  };


  const onSubmit = (data: any) => {
    console.log(data, uploadedFiles);
  }

  return (
    <section>
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка загрузки</p>}
      {data && (
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
                    <QuillEditor
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
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, locale)}
                  />

                  {/* Отображение выбранных файлов */}
                  {uploadedFiles?.[locale].map((file, index) => (
                    <p key={index}>{file.name}</p>
                  ))}
                </div>
              )
              )}
            </section>
          </section>
          <Button type="submit">Сохранить</Button>
        </form>
      )}
    </section>
  );
};
