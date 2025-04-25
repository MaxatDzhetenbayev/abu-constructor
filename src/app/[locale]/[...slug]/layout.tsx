import { ReactNode } from "react";

import { Footer } from "@/features/footer/Footer";
import { LayoutWrapper, } from "@/shared/ui";
import { BreadCrumbs, Header } from "@/widgets";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string[]; locale: string };
}) {
  return (
    <section>
      <Header />
      <LayoutWrapper>
        <BreadCrumbs locale={params.locale} slug={params.slug} />
        {children}
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
