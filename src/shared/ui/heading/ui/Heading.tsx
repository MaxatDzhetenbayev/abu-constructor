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
            className={clsx(
                "text-calc-2xl max-lg:text-center font-bold text-enbek_primary",
                className
            )}
        >
            {children}
        </h2>
    );
};
