"use client";
import { Settings } from "lucide-react";
import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/ui";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export const EditWidgetContentDialog = ({
  modal,
  name,
}: {
  modal: ReactNode;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-full ">
        <DialogHeader>
          <DialogTitle className="hidden">Виджет {name}</DialogTitle>
          <DialogDescription className="hidden">
            Редактирование виджета {name}
          </DialogDescription>
        </DialogHeader>
        {modal}
      </DialogContent>
    </Dialog>
  );
};
