"use client";
import React, { DragEvent } from "react";
import { useParams } from "next/navigation";
import { useDragAndDrop } from "@/shared/lib/hooks/useDrag&Drop";
import { INavigation } from "@/shared/types";

import { handleDragEnd } from "../libs/handle-drag-end";
import { INavigationItemProps } from "../model/admin-navigation.model";

export const AdminNavigation = ({
  item,
  actionSlot,
  onDragEnd,
  handler,
}: INavigationItemProps) => {
  const locale = useParams().locale as string;

  const { handleDragStart, handleDrop } = useDragAndDrop<INavigation>(
    onDragEnd || handleDragEnd
  );

  const { title, children: navigation_children, navigation_type } = item;
  const hasChildren = navigation_children && navigation_children.length > 0;
  const isGroup =
    navigation_type === "group-link" || navigation_type === "group";

  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      onDrop={(e: React.DragEvent<HTMLLIElement>) =>
        handleDrop(e, item, handler)
      }
      onDragOver={(e) => e.preventDefault()}
      className={"p-4 border border-gray-200 rounded-md flex flex-col gap-2"}
    >
      <section className="flex items-center">
        <h3 className="grow">{title[locale]}</h3>
        {actionSlot}
      </section>
      {hasChildren ? (
        <ul className="flex flex-col gap-3">
          {navigation_children.map((child) => (
            <AdminNavigation
              key={child.id}
              item={child}
              onDragEnd={handleDragEnd}
              handler={handler}
              actionSlot={actionSlot}
            />
          ))}
        </ul>
      ) : (
        isGroup && (
          <div
            onDrop={(e: DragEvent<HTMLDivElement>) =>
              handleDrop(e, item, handler)
            }
            onDragOver={(e) => e.preventDefault()}
            className="p-4 mt-2 border border-dashed border-gray-300 rounded-md"
          >
            Перетащите сюда элемент, чтобы добавить
          </div>
        )
      )}
    </li>
  );
};
