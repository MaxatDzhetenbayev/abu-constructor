import { INavigation } from "@/entities";
import { DragAndDropProps } from "@/shared/lib/hooks/useDrag&Drop";

import { UseMutateFunction } from "@tanstack/react-query";

export interface INavigationItemProps {
  item: INavigation;
  onDragEnd?: DragAndDropProps<INavigation>;
  handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>;
  ActionComponent: React.ComponentType<{ item: INavigation }>;
}
