"use client";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { SearchBar } from "@/features/search-bar";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui";

import { DialogTitle } from "@radix-ui/react-dialog";

export const SearchWidget = () => {
  const t = useTranslations("search");

  return (
    <Dialog>
      <DialogTrigger>
        <SearchIcon className="text-white w-10 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[40%] max-h-[95%] overflow-y-auto">
        <DialogTitle className="text-calc-xl font-bold text-center">
          {t("title")}
        </DialogTitle>
        <SearchBar />
      </DialogContent>
    </Dialog>
  );
};
