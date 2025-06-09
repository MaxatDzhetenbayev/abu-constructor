import { navbarStyles } from "../config/navbarStyles";

interface GetNavbarClassProps {
  scrolled: boolean;
  path: string;
  locale: string;
}

export const getNavbarClass = ({
  scrolled,
  path,
  locale,
}: GetNavbarClassProps): string => {
  if (scrolled) return navbarStyles.scrolled;
  if (path === `/${locale}/home`) return navbarStyles.notHovered;
  return navbarStyles.hovered;
};
