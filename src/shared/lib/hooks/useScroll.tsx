"use client";
import { useEffect, useState } from 'react';

export const useScroll = (srollValue: number) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Проверяем, существует ли document и window
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            const handleScroll = () => {
                if (window.scrollY >= srollValue) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            };

            document.addEventListener("scroll", handleScroll);

            return () => {
                document.removeEventListener("scroll", handleScroll);
            };
        }
    }, [srollValue]);

    return [scrolled];
};
