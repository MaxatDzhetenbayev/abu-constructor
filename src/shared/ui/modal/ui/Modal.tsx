import clsx from "clsx";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalProps {
  modalSlot: React.ReactNode | string;
  headerSlot?: React.ReactNode | string;
  children: React.ReactNode;
  isWfull?: boolean;
}

export const Modal = ({
  modalSlot,
  children,
  headerSlot,
  isWfull,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={clsx("overflow-auto max-h-[90%]",
          isWfull
            ? "max-w-[90%]"
            : "max-h-[80%] max-w-[90%] [@media(min-width:1180px)]:max-w-[50%]"
        )}
      >
        <DialogHeader>
          <DialogTitle className={clsx(!headerSlot ? "opacity-0" : "")}>
            {headerSlot}
          </DialogTitle>
        </DialogHeader>
        {typeof modalSlot === "string" ? (
          <div
            className={`quill-content`}
            dangerouslySetInnerHTML={{ __html: modalSlot }}
          ></div>
        ) : (
          modalSlot
        )}
      </DialogContent>
    </Dialog>
  );
};
