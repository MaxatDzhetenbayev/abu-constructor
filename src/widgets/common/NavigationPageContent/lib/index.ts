import { IWidget } from "@/shared/types";

import { IWidgetUpdateOrderOptions } from "../model/types";
import { UseMutateFunction } from "@tanstack/react-query";

export const handleDragEnd = (
  e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
  draggedItem: IWidget,
  targetItem: IWidget,
  handler: UseMutateFunction<
    () => Promise<any>,
    Error,
    IWidgetUpdateOrderOptions[],
    unknown
  >
) => {
  e.stopPropagation();
  handler([
    { id: draggedItem.id, order: targetItem.order },
    { id: targetItem.id, order: draggedItem.order },
  ]);
};
