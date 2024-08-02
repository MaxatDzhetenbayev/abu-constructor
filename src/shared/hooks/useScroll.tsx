import { useEffect, useState } from "react";

export const useScroll = (scrollValue: number) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (document && window) {
      document.addEventListener("scroll", () => {
        if (window.scrollY >= scrollValue) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    }
    return document.removeEventListener("scroll", () => {
      if (window.scrollY >= scrollValue) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, [scrollValue]);

  return [scrolled];
};
