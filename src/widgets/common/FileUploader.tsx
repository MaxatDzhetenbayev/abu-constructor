"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { backendImageUrl, backendUrl } from "@/shared/lib/constants";
import { Button, Input, useToast } from "@/shared/ui";

import { useMutation } from "@tanstack/react-query";

interface FileUploaderProps {
  id?: string;
  file: string;
  field: string;
  label: string;
  onChange: (val: File | string) => void;
  setIsUploading?: Dispatch<SetStateAction<boolean>>;
}

export const FileUploader = ({
  file,
  label,
  onChange,
  field,
  setIsUploading,
}: FileUploaderProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (file) {
      setImage(`${backendImageUrl}${file}`);
    }
  }, [file]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (setIsUploading) setIsUploading(true);

      reader.onload = function (event) {
        if (event.target) setImage(event.target.result);
      };
      reader.readAsDataURL(file);

      // Отправляем файл на сервер
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${backendUrl}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Ошибка при загрузке файла");
        }

        const filename = await response.text();
        onChange(filename); // Возвращаем имя файла
        toast({
          title: "Файл загружен",
          description: "Файл был успешно загружен на сервер",
        });
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      } finally {
        if (setIsUploading) setIsUploading(false); // Завершаем загрузку
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (fileName: string) => {
      const response = await fetch(`${backendUrl}/upload/${fileName}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении файла");
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 border p-4">
      <p>{label}</p>
      {field === "image" && image && (
        <Image width={80} height={80} src={image as string} alt="image" />
      )}
      {field === "file" && typeof file === "string" && file.length > 0 && (
        <a
          href={`${backendImageUrl}${file}`}
          target="_blank"
          className="text-lg"
        >
          Посмотреть прикрепленный файл
        </a>
      )}
      <div className="flex items-center ">
        <Input type="file" label="" onChange={handleFileChange} />
        {file && typeof file === "string" && file.length > 0 && (
          <Button onClick={() => mutate(file)}>Удалить файл</Button>
        )}
      </div>
    </div>
  );
};
