import Image from 'next/image';
import React from 'react'


interface MoreArrowProps {
    width: number;
    height: number;
}

export const MoreArrow = ({ width, height }: MoreArrowProps) => {
    const commonClasses = "group-hover:hidden";
    const hoverClasses = "hidden group-hover:block";
    return (
        <>
            <Image
                src="/icons/right-arrow-primary.svg"
                width={width}
                height={height}
                className={commonClasses}
                alt="Кнопка для активации"
            />
            <Image
                src="/icons/right-arrow-white.svg"
                width={width}
                height={height}
                className={hoverClasses}
                alt="Кнопка для активации"
            />
        </>
    );
}
