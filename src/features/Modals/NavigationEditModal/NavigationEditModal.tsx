"use client";
import React, { useRef, useState } from "react";
import { Settings } from "lucide-react";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { INavigation } from "@/shared/types";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { queryClient } from "@/shared/lib/client";
import { INavigation } from "@/shared/types";

import { NavigationEditModalForm } from "./model";
import { fetchUpdateNavigation } from "./api/index";

export const NavigationEditModal = ({
  navigationItem,
}: {
  navigationItem: INavigation;
}) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("pages");
  const locale = useParams().locale as string;
  const { register, handleSubmit, reset } = useForm<NavigationEditModalForm>({
    mode: "onBlur",
    defaultValues: {
      slug: navigationItem?.slug || "",
      title: { ...navigationItem.title },
      variant: navigationItem.variant || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["navigations"],
    mutationFn: fetchUpdateNavigation,
    onSuccess: (updatedNavigation: INavigation) => {
      if (closeRef.current) closeRef.current.click();
      queryClient.invalidateQueries({
        queryKey: ["navigations"],
      });
      reset({
        slug: updatedNavigation.slug,
        title: { ...updatedNavigation.title },
        variant: updatedNavigation.variant,
      });
    },
  });

  const handleEdit: SubmitHandler<NavigationEditModalForm> = ({
    title,
    slug,
  }) => {
    if (!navigationItem) return;
    mutate({
      id: navigationItem.id,
      data: {
        title: { ...title },
        slug,
        variant: navigationItem.variant,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-3xl">
        {!navigationItem ? (
          <div>{t("notFound")}</div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {t("edit.title")} - {navigationItem.title[locale]}
              </DialogTitle>
              <DialogDescription>{t("edit.desc")}</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleEdit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  label={t("form.nameRu")}
                  {...register("title.ru", { required: true })}
                />
                <Input
                  label={t("form.nameKz")}
                  {...register("title.kz", { required: true })}
                />
                <Input
                  label={t("form.nameEn")}
                  {...register("title.en", { required: true })}
                />
              </div>
              <Input
                label={t("form.slug")}
                {...register("slug", { required: true })}
              />
              <Select {...register("variant", { required: true })}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={"Обращение"}
                    defaultValue={navigationItem.variant || ""}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">Горизонтально</SelectItem>
                  <SelectItem value="vertical">Вертикально</SelectItem>
                </SelectContent>
              </Select>
              {(navigationItem.navigation_type === "group-link" ||
                navigationItem.navigation_type === "content") && (
                <Link
                  className="w-full bg-[#640000] text-white text-center rounded-md p-2"
                  href={{ pathname: `pages/${navigationItem.id}` }}
                >
                  {t("table.edit")}
                </Link>
              )}
              <Button type="submit" loading={isPending} disabled={isPending}>
                {t("form.save")}
              </Button>
            </form>
            <DialogFooter className=" gap-2 sm:justify-start">
              <DialogClose asChild>
                <Button
                  className="w-full"
                  ref={closeRef}
                  type="button"
                  variant="secondary"
                >
                  {t("edit.decline")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
