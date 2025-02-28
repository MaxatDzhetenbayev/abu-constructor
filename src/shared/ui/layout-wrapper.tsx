"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {

  return (
    <main
      className={clsx(
        "col-span-3 min-h-[100svh] max-w-[1200px] mx-auto flex flex-col lg:px-0 px-3 gap-10 my-10 2md:mb-40 max-2md:mt-[120px] 2md:relative ",
      )}
    >
      {children}
    </main>
  );
};
