"use client";
import { AdminNavigation } from "@/entities";

import { NavigationControl } from "./ui/navigation-control";
import { useNavigations } from "./model/useNavigations";

export const NavigationList = () => {
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
          actionSlot={<NavigationControl item={item} />}
        />
      ))}
    </ul>
  );
};
