import { ReactNode } from "react";

import { LayoutWrapper } from "@/shared/ui";
import { BreadCrumbs } from "@/widgets";
import { EnbekFooter } from "@/widgets/common/Footer/ui/EnberFooter";
import { EnbekHeader } from "@/widgets/common/Header/ui/EnbekHeader";

export default async function Layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { slug: string[]; locale: string };
}) {
    return (
        <section>
            <EnbekHeader />
            <LayoutWrapper>
                <BreadCrumbs locale={params.locale} slug={params.slug} />
                {children}
            </LayoutWrapper>
            <EnbekFooter />
        </section>
    );
}
