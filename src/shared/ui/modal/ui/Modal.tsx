import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../dialog'
import { DialogTitle } from '@radix-ui/react-dialog';
import clsx from 'clsx';

interface ModalProps {
    modalSlot: ReactNode | string
    headerSlot?: string;
    children: React.ReactNode;
}

export const Modal = ({ modalSlot, children, headerSlot }: ModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-auto max-w-[90%] [@media(min-width:1180px)]:max-w-[50%]">
                <DialogHeader>
                    <DialogTitle className={clsx(!headerSlot ? "opacity-0" : "")}>{headerSlot}</DialogTitle>
                </DialogHeader>
                {
                    typeof modalSlot === 'string'
                        ? (
                            <div className={`quill-content`} dangerouslySetInnerHTML={{ __html: modalSlot }}></div>
                        )
                        : modalSlot
                }
            </DialogContent>
        </Dialog>
    )
}
