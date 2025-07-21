"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { locales } from "@/i18n";
import { backendImageUrl, backendUrl } from "@/shared/lib/constants";
import { Button, Input, useToast } from "@/shared/ui";

import { useMutation } from "@tanstack/react-query";

interface FileUploaderProps {
  id?: string;
  file: Record<string, string>; // теперь объект с ключами языка
  field: string;
  label: string;
  onChange: (val: Record<string, string>) => void;
  setIsUploading?: Dispatch<SetStateAction<boolean>>;
}

export const FileUploader = ({
  file = {},
  label,
  onChange,
  field,
  setIsUploading,
}: FileUploaderProps) => {
  const [images, setImages] = useState<Record<string, string | null>>({});
  const { toast } = useToast();

  useEffect(() => {
    const newImages: Record<string, string | null> = {};
    locales.forEach((locale) => {
      newImages[locale] = file?.[locale]
        ? `${backendImageUrl}${file[locale]}`
        : null;
    });
    setImages(newImages);
  }, [file]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    locale: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();

      if (setIsUploading) setIsUploading(true);

      reader.onload = (event) => {
        setImages((prev) => ({
          ...prev,
          [locale]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${backendUrl}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Ошибка при загрузке файла");
        }

        const filename = await response.text();
        const updatedFiles = { ...file, [locale]: filename };
        onChange(updatedFiles);

        toast({
          title: "Файл загружен",
          description: `Файл (${locale}) был успешно загружен`,
        });
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      } finally {
        if (setIsUploading) setIsUploading(false);
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: async ({ fileName }: { fileName: string }) => {
      const response = await fetch(`${backendUrl}/upload/${fileName}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении файла");
      }
    },
  });

  const handleDelete = (locale: string) => {
    const fileName = file?.[locale];
    if (!fileName) return;

    mutate(
      { fileName },
      {
        onSuccess: () => {
          const updated = { ...file };
          delete updated[locale];
          onChange(updated);

          toast({
            title: "Файл удалён",
            description: `Файл (${locale}) успешно удалён`,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 border p-4">
      <p>{label}</p>

      {locales.map((locale) => (
        <div key={locale} className="flex  gap-2">
          <label className="font-medium">{locale.toUpperCase()}</label>

          {field === "image" && images[locale] && (
            <Image
              width={80}
              height={80}
              src={images[locale] as string}
              alt={`image-${locale}`}
            />
          )}

          {field === "file" && file?.[locale] && (
            <a
              href={`${backendImageUrl}${file[locale]}`}
              target="_blank"
              className="text-lg"
            >
              Посмотреть прикреплённый файл ({locale})
            </a>
          )}

          <div className="flex items-center gap-3">
            <Input
              type="file"
              label=""
              onChange={(e) => handleFileChange(e, locale)}
            />
            {file?.[locale] && (
              <Button type="button" onClick={() => handleDelete(locale)}>
                Удалить
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
