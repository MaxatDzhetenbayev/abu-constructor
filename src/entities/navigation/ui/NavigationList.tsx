import React from "react";
import { INavigation } from "@/shared/types";
import { NavigationItem } from "./NavigationItem";
import { useNavigationList } from "../api/useNavigationList";
import { Skeleton } from "@/shared/ui";
import { useParams } from "next/navigation";

interface INavListProps {
  hoveredItem: number | null;
  setHoveredItem: (id: number | null) => void;
}

export const NavigationList = ({
  hoveredItem,
  setHoveredItem,
}: INavListProps) => {
  const { data: navigations, isFetching } = useNavigationList();
  const locale = useParams().locale as string;

  const handleMouseEnter = (id: number) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      {isFetching ? (
        <div className="w-[600px] grid place-items-center h-[5.875rem]">
          <Skeleton className="w-full h-[3rem]" />
        </div>
      ) : navigations ? (
        <ul className="flex text-start gap-5 text-xl">
          {navigations.map((mainPage) => (
            <NavigationItem
              key={mainPage.id}
              item={mainPage}
              locale={locale}
              hoveredItem={hoveredItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </ul>
      ) : (
        <span>Навигация не найдена</span>
      )}
    </>
  );
};
