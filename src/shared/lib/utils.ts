import { uploadFile } from "@/shared/api/widgets";

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
