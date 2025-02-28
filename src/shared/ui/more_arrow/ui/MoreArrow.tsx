import { ArrowRight } from 'lucide-react';
import React from 'react'


interface MoreArrowProps {
    size: number;
}

export const MoreArrow = ({ size }: MoreArrowProps) => {
    // const commonClasses = "group-hover:hidden";
    // const hoverClasses = "hidden group-hover:block";
    return (
        <ArrowRight fontSize={size} className='text-abu_primary' />
    );
}
