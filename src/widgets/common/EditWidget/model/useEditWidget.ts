import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEditWidgetMainOptions, fetchWidgetOptions } from "../api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { EditOptionsProps } from "./types";
import { queryClient } from "@/shared/lib/client";
import { useToast } from "@/shared/ui";

export const useEditWidget = (
  widgetId: string,
  widgetOptionList: EditOptionsProps[]
) => {
  const { toast } = useToast()

  const { data: widget } = useQuery({
    queryKey: ["widget", widgetId],
    queryFn: () => fetchWidgetOptions(widgetId),
  });
  const [widgetOptions, setWidgetOptions] = useState<
    EditOptionsProps | undefined
  >();

  useEffect(() => {
    setWidgetOptions(
      widgetOptionList.find((item) => item.widgetName === widget?.widget_type)
    );
  }, [widget]);

  const { register, control, reset, handleSubmit } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["widget", widgetId],
    mutationFn: (data) => fetchEditWidgetMainOptions(data, widgetId),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
      reset({ ...data.options });
      toast({ title: "Настройки", description: "Главные настройки виджета были обновлены" })
    },
  });

  useEffect(() => {
    if (widget) {
      reset({
        ...widget.options,
      });
    }
  }, [widget, reset]);

  const handleUpdateMainOptions = (data: any) => {
    mutate(data);
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(handleUpdateMainOptions),
    widgetOptions,
    widget_type: widget?.widget_type,
    widget_variant: widget?.options?.variant,
  };
};
