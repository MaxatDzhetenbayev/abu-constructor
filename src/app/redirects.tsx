
'use client'

import { redirect, usePathname } from "next/navigation";

const redirectSlugs = [
    "836-sabitov-serik-muhametkazinovich",
    "834-tulebaeva-k-t",
    "447-baygazinov-zhanat-abylkanovich",
    "816-karazhanov-malik-dulatovich",
    "854-shustova-elena-pavlovna",
];


export const Redirects = () => {
    const path = usePathname()
    if (redirectSlugs.some(slug => path.includes(slug))) {
        const matchedSlug = redirectSlugs.find(slug => path.includes(slug));
        return redirect(`https://old.abu.edu.kz/${matchedSlug}`);
    }
    return <></>

}
