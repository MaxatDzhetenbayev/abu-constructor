import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";
import { toast } from "@/shared/ui/use-toast";

import { INews } from "../types/types";
import { useMutation } from "@tanstack/react-query";

export const useDeleteNewsById = (id: number) => {
  return useMutation<INews>({
    mutationKey: ["news", id],
    mutationFn: async () => {
      const res = await fetch(`${backendUrl}/news/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка при удалении новости");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      toast({
        title: "Новость удалена",
        description: "Новость успешно удалена.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить новость.",
      });
    },
  });
};
