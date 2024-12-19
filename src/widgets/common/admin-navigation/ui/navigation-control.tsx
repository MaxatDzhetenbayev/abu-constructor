import React from "react";

import {
  AdminNavigationCreate,
  DeletePageBtn,
  NavigationEditModal,
} from "@/features";

import { INavigation } from "@/shared/types";
import { useParams } from "next/navigation";

export const NavigationControl = ({ item }: { item: INavigation }) => {
  const locale = useParams().locale as string;

  const { navigation_type, title, id } = item;
  return (
    <section className="flex items-center">
      <div className="flex gap-2 ">
        <NavigationEditModal navigationItem={item} />
        {(navigation_type === "group-link" || navigation_type === "group") && (
          <AdminNavigationCreate parent_id={id} />
        )}
        <DeletePageBtn navigationId={id} name={title[locale]} />
      </div>
    </section>
  );
};
