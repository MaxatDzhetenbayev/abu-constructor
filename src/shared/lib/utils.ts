import { uploadFile } from "@/shared/api/widgets";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const saveToServerAndGetUrl = async (image: File | null | string) => {
  if (typeof image == "string") {
    return image;
  }
  if (image) {
    const { file_name } = await uploadFile(image);

    return file_name;
  } else {
    return "";
  }
};
