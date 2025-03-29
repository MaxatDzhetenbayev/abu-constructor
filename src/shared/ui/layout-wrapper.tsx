"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

export const LayoutWrapper = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: string;
}) => {
  return (
    <main
      className={clsx("min-h-[100svh] max-w-[1200px] w-full mx-auto ", styles)}
    >
      {children}
    </main>
  );
};
