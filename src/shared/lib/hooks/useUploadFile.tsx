"use client";
import Image from "next/image";
import { ReactNode,useState } from "react";

import { backendImageUrl } from "@/shared/lib/constants";
import { Input } from "@/shared/ui";

export const useUploadFile = ({
  id,
  file,
  writeChanges,
}: {
  id: string;
  file: string;
  writeChanges: (id: string, field: string, value: File | string) => void;
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(() => {
    if (file) {
      return `${backendImageUrl}${file}`;
    } else {
      return "";
    }
  });
  const Preview: ReactNode = image ? (
    <Image height={80} width={80} src={image as string} alt="image" />
  ) : (
    <></>
  );

  const FileInput: ReactNode = (
    <Input
      type="file"
      label="Image"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = function (event) {
            if (event.target) setImage(event.target.result);
          };
          reader.readAsDataURL(file);
          writeChanges(id, "image", file);
        }
      }}
    />
  );

  return { Preview, FileInput };
};
