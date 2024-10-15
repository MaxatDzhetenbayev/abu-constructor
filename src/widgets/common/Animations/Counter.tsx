"use client"
import React, { useEffect, useState } from 'react'

export const Counter = ({ targetValue }: { targetValue: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = targetValue / (duration / 100);

        const interval = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                setCount(targetValue);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 100);

        return () => clearInterval(interval);
    }, [targetValue]);

    return <span>{count}</span>;
}
