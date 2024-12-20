import { UseMutateFunction } from "@tanstack/react-query";
import { DragAndDropProps } from "@/shared/lib/hooks/useDrag&Drop";
import { INavigation } from "@/entities";

export interface INavigationItemProps {
  item: INavigation;
  onDragEnd?: DragAndDropProps<INavigation>;
  handler: UseMutateFunction<() => Promise<any>, Error, any[], unknown>;
  ActionComponent: React.ComponentType<{ item: INavigation }>;
}
