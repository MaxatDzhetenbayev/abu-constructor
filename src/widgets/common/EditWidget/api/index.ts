import { backendUrl } from "@/shared/lib/constants";
import { IContent } from "@/shared/types";

import { IContentCreationParams } from "../model/types";

export const fetchWidgetOptions = async (widgetId: string) => {
  const response = await fetch(`${backendUrl}/widgets/${widgetId}`);
  const data = await response.json();
  return data;
};

export const fetchEditWidgetMainOptions = async (
  data: any,
  widgetId: string
) => {
  const sendData = {
    options: { ...data },
  };

  const response = await fetch(`${backendUrl}/widgets/${widgetId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...sendData }),
  });

  return response.json();
};

export const fetchContentsByWidgetId = async (
  widgetId: string
): Promise<IContent[]> => {
  const response = await fetch(
    `${backendUrl}/contents/by-widget-id/${widgetId}`
  );
  const data = await response.json();
  return data;
};

export const fetchCreateContent = async ({
  widgetId,
  content,
  options,
}: IContentCreationParams): Promise<IContent> => {
  const response = await fetch(`${backendUrl}/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      options,
      widget_id: widgetId,
    }),
  });

  return response.json();
};

export const fetchUpdateContent = async ({
  content,
  id,
}: {
  content: any;
  id: number;
}): Promise<IContent> => {
  const sendData = {
    content,
  };

  const response = await fetch(`${backendUrl}/contents/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...sendData }),
  });

  return response.json();
};
