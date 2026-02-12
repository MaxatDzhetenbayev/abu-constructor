import { queryClient } from "@/shared/lib/client";
import { backendUrl } from "@/shared/lib/constants";
import { toast } from "@/shared/ui/use-toast";

import { IAppeal } from "../types";
import { useMutation } from "@tanstack/react-query";

export const useCompleteAppealCheck = (id: number) => {
  return useMutation<IAppeal>({
    mutationKey: ["appeals", "complete", id],
    mutationFn: async () => {
      const res = await fetch(`${backendUrl}/appeals/${id}/complete-check`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Ошибка при обновлении статуса обращения");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appeals"] });
      queryClient.invalidateQueries({ queryKey: ["appeals", id] });

      toast({
        title: "Статус обновлён",
        description: "Обращение отмечено как проверенное.",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус обращения.",
      });
    },
  });
};

