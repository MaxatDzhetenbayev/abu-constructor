"use client"

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui';
import { viewInputByType } from '@/widgets/common/EditWidget/ui';

import { ContentManageModalProps } from '../model/types'
import { useManageContent } from '../model/use-manage';
import { useRemoveContent } from '../model/use-remove';

export const ContentManage = ({ id, action, widgetOptionsList, widget_type, widget_variant, handleCreateContent, handleUpdateContent, contents, TemplateSection }: ContentManageModalProps) => {

    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);
    const { register, handleSubmit, control, reset } = useForm({
        mode: "onBlur",
        defaultValues: {
            content: {},
            id,
        },
    });

    const { isUploading, onSubmit, options, setIsUploading } = useManageContent({
        action,
        widget_type,
        widgetOptionsList,
        reset,
        closeRef,
        handleCreateContent,
        handleUpdateContent
    })
    const { mutate: handleRemoveContent } = useRemoveContent(id)

    useEffect(() => {
        if (contents) {
            reset((prevValues) => ({
                ...prevValues,
                content: contents,
            }));
        }
    }, [contents]);



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={action === "create" ? `w-full` : ""}>
                <Button>
                    {action === "create" ? "Создать контент" : "Редактировать"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] max-h-[95%] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>
                        {action === "create" ? "Создать" : "Редактировать"} контент
                    </DialogTitle>
                    <DialogDescription>
                        Здесь вы можете управлять контентом
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {Array.isArray(options)
                        ? options?.map((option) => {
                            return (
                                <Fragment key={option.props}>
                                    {viewInputByType(
                                        option.type,
                                        option,
                                        register,
                                        control,
                                        setIsUploading
                                    )}
                                </Fragment>
                            );
                        })
                        : options?.(widget_variant as string).map((option) => {
                            return (
                                <Fragment key={option.props}>
                                    {viewInputByType(
                                        option.type,
                                        option,
                                        register,
                                        control,
                                        setIsUploading
                                    )}
                                </Fragment>
                            );
                        })}
                    <Button className="w-full" type="submit" disabled={isUploading}>
                        {action === "create" ? "Создать" : "Изменить"}
                    </Button>
                </form>
                {TemplateSection}
                {action === "update" && (
                    <>
                        <Button onClick={() => handleRemoveContent(id)}>
                            Удалить контент
                        </Button>
                    </>
                )
                }

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            className="w-full"
                            ref={closeRef}
                            type="button"
                            variant="secondary"
                        >
                            Отменить
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
