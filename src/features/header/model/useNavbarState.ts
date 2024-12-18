import { useState } from "react";
import { useScroll } from "@/shared/lib/hooks/useScroll";

export const useNavbarState = () => {
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [scrolled] = useScroll(40);

  return {
    hoveredItem,
    setHoveredItem,
    scrolled,
  };
};
