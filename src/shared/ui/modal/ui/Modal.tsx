import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../../dialog'
import { DialogTitle } from '@radix-ui/react-dialog';

interface ModalProps {
    modalContents: string
    children: React.ReactNode;
}

export const Modal = ({ modalContents, children }: ModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-h-[80%] overflow-auto max-w-[90%] [@media(min-width:1180px)]:max-w-[50%]">
                <DialogHeader>
                    <DialogTitle className="opacity-0"></DialogTitle>
                </DialogHeader>
                <div className={`quill-content`} dangerouslySetInnerHTML={{ __html: modalContents }}></div>
            </DialogContent>
        </Dialog>
    )
}
