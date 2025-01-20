import { navbarStyles } from "../config/navbarStyles";

interface GetNavbarClassProps {
  scrolled: boolean;
  hoveredItem: number | null;
  path: string;
  locale: string;
}

export const getNavbarClass = ({
  scrolled,
  hoveredItem,
  path,
  locale,
}: GetNavbarClassProps): string => {
  if (scrolled) return navbarStyles.scrolled;
  if (hoveredItem) return "bg-[#640000]";
  if (path === `/${locale}/home`) return navbarStyles.notHovered;
  return navbarStyles.hovered;
};
