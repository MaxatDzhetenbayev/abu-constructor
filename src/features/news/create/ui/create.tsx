import { Plus } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { locales } from "@/i18n";
import { backendUrl } from "@/shared/lib/constants";
import { Button, Input, Modal } from "@/shared/ui";
import JoditEditorComponent from "@/shared/ui/quill-editor";

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
  const { register, handleSubmit, control } = useForm();
  const formData = new FormData();
  const onSubmit = async (data: any) => {
    formData.append("data", JSON.stringify(data));

    locales.forEach((locale) => {
      const inputElement = document.getElementById(locale) as HTMLInputElement;
      if (inputElement && inputElement.files) {
        Array.from(inputElement.files).forEach((file) => {
          formData.append(`${locale}`, file);
        });
      }
    });

    const response = await fetch(`${backendUrl}/news`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("News created");
    } else {
      console.log("Error creating news");
    }
  };

  return (
    <section>
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
