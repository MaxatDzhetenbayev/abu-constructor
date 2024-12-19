"use client"

import React, { useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Settings } from "lucide-react";

import { INavigation } from '@/entities';
import { Button, DialogClose, DialogFooter, Input, Modal, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { queryClient } from '@/shared/lib/client';

import { NavigationEditModalForm } from '../api/fetch-edit';
import { useAdminEditNavigation } from '../model/use-edit';


export const AdminNavigationEdit = ({
    navigationItem,
}: {
    navigationItem: INavigation;
}) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const t = useTranslations("pages");
    const locale = useParams().locale as string;
    const { register, handleSubmit, reset, getValues, control } = useForm<NavigationEditModalForm>({
        mode: "onBlur",
        defaultValues: {
            slug: navigationItem?.slug || "",
            title: { ...navigationItem.title },
            variant: navigationItem.variant || "",
        },
    });



    const { mutate, isPending } = useAdminEditNavigation(
        closeRef,
        reset,
        queryClient
    )

    const handleEdit: SubmitHandler<NavigationEditModalForm> = ({
        title,
        slug,
        variant
    }) => {

        if (!navigationItem) return;
        mutate({
            id: navigationItem.id,
            data: {
                title: { ...title },
                slug,
                variant,
            },
        });
    };

    return (
        <Modal
            headerSlot={
                <>
                    {t("edit.title")} - {navigationItem.title[locale]}
                </>
            }
            modalSlot={
                <>
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
                        <Controller
                            name="variant"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Вариант"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="horizontal">Горизонтально</SelectItem>
                                        <SelectItem value="vertical">Вертикально</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

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
            }
        >
            <Button size={"sm"}>
                <Settings />
            </Button>
        </Modal>
    )
}
