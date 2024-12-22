import { IContent } from "@/shared/types";

import { IContentUpdateOrderOptions } from "../model/types";
import { UseMutateFunction } from "@tanstack/react-query";

export const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLIElement>,
    draggedItem: IContent,
    targetItem: IContent,
    handler: UseMutateFunction<
        () => Promise<any>,
        Error,
        IContentUpdateOrderOptions[],
        unknown
    >
) => {
    e.stopPropagation();
    handler([
        { id: draggedItem.id, order: targetItem.order },
        { id: targetItem.id, order: draggedItem.order },
    ]);
};
