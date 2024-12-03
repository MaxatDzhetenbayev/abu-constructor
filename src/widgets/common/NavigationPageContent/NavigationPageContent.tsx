"use client";
import React from "react";

import { useTranslations } from "next-intl";

import { useNavigationPageContent } from "./model/useNavigationPageContent";
import { INavigationPageContent } from "./model/types";

import { WidgetListSection } from "./WidgetListSection";
import { NavigationPageItems } from "./NavigationPageItems";

export const NavigationPageContent = ({
  params: { id, locale },
}: INavigationPageContent) => {
  const trans = useTranslations("pages.pageEditorContent");

  const { handleWidgetCreate } = useNavigationPageContent(id);

  return (
    <section className="flex gap-5">
      <NavigationPageItems id={id} trans={trans} locale={locale} />
      <WidgetListSection
        trans={trans}
        id={id}
        handleWidgetCreate={handleWidgetCreate}
      />
    </section>
  );
};
