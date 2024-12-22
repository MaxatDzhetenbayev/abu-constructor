"use client";
import { useTranslations } from "next-intl";
import React from "react";

import { INavigationPageContent } from "./model/types";
import { useNavigationPageContent } from "./model/useNavigationPageContent";
import { NavigationPageItems } from "./NavigationPageItems";
import { WidgetListSection } from "./WidgetListSection";

export const NavigationPageContent = ({
  params: { id },
}: INavigationPageContent) => {
  const trans = useTranslations("pages.pageEditorContent");

  const { handleWidgetCreate } = useNavigationPageContent(id);


  return (
    <section className="flex gap-5">
      <NavigationPageItems id={id} trans={trans} />
      <WidgetListSection
        trans={trans}
        id={id}
        handleWidgetCreate={handleWidgetCreate}
      />
    </section>
  );
};
