import { queryClient } from "@/shared/lib/client";
import { IWidget } from "@/shared/types";

import { IWidgetCreateOptions } from "./types";

import {
  fetchWidgetCreate,
  fetchWidgetListByNavigationId,
  fetchWidgetOrderUpdate,
  fetchWidgetRemoveById,
} from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNavigationPageContent = (id: string) => {
  const { data: widgets, isFetching } = useQuery<IWidget[]>({
    queryKey: ["widgets"],
    queryFn: () => fetchWidgetListByNavigationId(id),
  });

  const { mutate: handleWidgetUpdate } = useMutation({
    mutationFn: fetchWidgetOrderUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetDelete } = useMutation({
    mutationFn: fetchWidgetRemoveById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  const { mutate: handleWidgetCreate } = useMutation<
    any,
    Error,
    IWidgetCreateOptions
  >({
    mutationFn: (data: IWidgetCreateOptions) => fetchWidgetCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
    },
  });

  return {
    widgets,
    isFetching,
    handleWidgetUpdate,
    handleWidgetDelete,
    handleWidgetCreate,
  };
};
