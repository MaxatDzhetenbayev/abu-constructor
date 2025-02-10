"use client";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { INavigation, NavigationEnum } from "@/entities";
// import { FileUploader } from "@/features/file-upload";
import { queryClient } from "@/shared/lib/client";
import {
  Button,
  DialogClose,
  DialogFooter,
  Input,
  Label,
  Modal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

import { useAdminCreateNavigation } from "../model/use-create";

interface AdminNavigationCreateProps {
  parent_id?: number | null;
}

export const AdminNavigationCreate = ({
  parent_id = null,
}: AdminNavigationCreateProps): React.JSX.Element => {
  const [pageType, setPageType] = useState<NavigationEnum>(
    NavigationEnum.CONTENT
  );
  const t = useTranslations("pages");
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INavigation>({
    mode: "onBlur",
    defaultValues: {
      title: {},
      slug: "",
    },
  });

  const { mutate, isPending } = useAdminCreateNavigation(
    closeRef,
    reset,
    queryClient
  );

  const handleCreate: SubmitHandler<
    Pick<INavigation, "slug" | "title" | "navigation_type" | "parent_id">
  > = (data) => {
    mutate({ ...data, navigation_type: pageType, parent_id: parent_id });
  };

  return (
    <>
      <Modal
        modalSlot={
          <>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(handleCreate)}
            >
              <Input
                label={t("form.nameRu")}
                {...register("title.ru", { required: true })}
                error={errors.title?.ru?.message}
              />
              <Input
                label={t("form.nameKz")}
                {...register("title.kz", { required: true })}
                error={errors.title?.kz?.message}
              />
              <Input
                label={t("form.nameEn")}
                {...register("title.en", { required: true })}
                error={errors.title?.kz?.message}
              />
              <div className="flex flex-col gap-3">
                <Label htmlFor="pageType">{t("form.select.placeholder")}</Label>
                <Select
                  value={pageType}
                  onValueChange={(value: NavigationEnum) => setPageType(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("form.select.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"content"}>
                      {t("form.select.content")}
                    </SelectItem>
                    <SelectItem value={"group"}>
                      {t("form.select.group")}
                    </SelectItem>
                    <SelectItem value={"group-link"}>
                      {t("form.select.group-link")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                label={t("form.slug")}
                {...register("slug", { required: true })}
                error={errors.slug?.message}
              />
              <Button loading={isPending} disabled={isPending} type="submit">
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
                  {t("create.decline")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        }
      >
        <Button size={"sm"} className={"mb-3"}>
          {parent_id ? t("create.childBtn") : t("create.btn")}
        </Button>
      </Modal>
      {/* <FileUploader /> */}
    </>
  );
};
