export interface INavigation {
  id: number;
  title: {
    [key: string]: string;
  };
  slug: string;
  navigation_type: NavigationEnum;
  order: number;
  parent_id: null | number;
  variant: string;
  children: INavigation[];
  createdAt: string;
  updatedAt: string;
}

export enum NavigationEnum {
  GROUP = "group",
  GROUP_LINK = "group-link",
  CONTENT = "content",
  LINK = "link",
  DETAIL = "detail",
}
