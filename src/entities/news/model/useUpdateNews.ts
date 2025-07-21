import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";
import { toast } from "@/shared/ui/use-toast";

import { useMutation } from "@tanstack/react-query";

export const useUpdateNews = () => {
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      const res = await fetch(`${backendUrl}/news/${id}`, {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Ошибка при обновлении");
      return res.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["news", id] });
      queryClient.invalidateQueries({ queryKey: ["news"] });

      toast({
        title: "Новость обновлена",
        description: "Новость успешно обновлена.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить новость.",
      });
    },
  });
};
