"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

import { useScroll } from "../lib/hooks/useScroll";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const [scrolled] = useScroll(40);

  return (
    <main
      className={clsx(
        "min-h-[100svh] max-w-[1200px] mx-auto flex flex-col lg:px-0 px-3 gap-10 my-10 2md:mb-40 max-2md:mt-[120px] 2md:relative ",
        scrolled && "top-[94px]"
      )}
    >
      {children}
    </main>
  );
};
