"use client";
import { AdminNavigation } from "@/entities";

import { NavigationControl } from "./navigation-control";
import { useNavigations } from "../model/useNavigations";

export const AdminNavigations = () => {
  const { data, isLoading, handleUpdateOrder } = useNavigations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {data?.map((item) => (
        <AdminNavigation
          key={item.id}
          item={item}
          handler={handleUpdateOrder}
          ActionComponent={NavigationControl}
        />
      ))}
    </ul>
  );
};
