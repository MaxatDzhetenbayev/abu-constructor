"use client";
import React from "react";

import { ContentManage } from '@/features'
import { IContent } from "@/shared/types";

import { Types, useEditWidget, useEditWidgetContent } from "./model";
import { EditorItems,EditorMain } from "./ui";

import { WidgetOptionList } from "../..";

export const EditWidget = ({ widgetId }: Types.EditWidgetProps) => {
  const {
    register,
    control,
    handleSubmit,
    widgetOptions,
    ...widgetInfo
  } = useEditWidget(widgetId, WidgetOptionList);

  const { contents, handleCreateContent, handleUpdateContent } =
    useEditWidgetContent(widgetId);

  return (
    <section>
      <EditorMain
        register={register}
        widgetOptions={widgetOptions}
        handleSubmit={handleSubmit}
        control={control}
      />
      <EditorItems
        contents={contents}
        CreateButton={
          <ContentManage
            action="create"
            widgetOptionsList={WidgetOptionList}
            {...widgetInfo}
            handleCreateContent={handleCreateContent}
            handleUpdateContent={handleUpdateContent}
          />
        }
        EditButton={(contents: IContent, id: number) => {
          return (
            <ContentManage
              id={id}
              action="update"
              widgetOptionsList={WidgetOptionList}
              {...widgetInfo}
              contents={contents}
              handleCreateContent={handleCreateContent}
              handleUpdateContent={handleUpdateContent}
            />
          );
        }}
      />
    </section>
  );
};
