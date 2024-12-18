export interface INavigation {
  id: number;
  title: {
    [key: string]: string;
  };
  slug: string;
  navigation_type: NavigationType;
  order: number;
  parent_id: null | number;
  variant: string;
  children: INavigation[];
  createdAt: string;
  updatedAt: string;
}

export enum NavigationType {
  LINK = "link",
  GROUP = "group",
  GROUP_LINK = "group-link",
}
