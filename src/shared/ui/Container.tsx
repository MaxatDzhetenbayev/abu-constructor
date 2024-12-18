import clsx from "clsx";
import { ReactNode } from "react";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={clsx(
        "max-w-[1500px] font-raleway px-3  w-full mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
};
