import clsx from "clsx";
import React, { ReactNode } from "react";

interface IHeadingProps {
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  children,
  className,
}: IHeadingProps): React.JSX.Element | null => {
  return (
    <h2
      className={clsx("text-calc-2xl font-bold text-[#67493E] mb-6", className)}
    >
      {children}
    </h2>
  );
};
