import { ReactNode } from "react";

import { Footer } from "@/features/home";
import { LayoutWrapper } from "@/shared/ui";
import { BreadCrumbs, Header, Sidebar } from "@/widgets";
import { OurPlatforms } from "@/widgets/common/OurPlatrorms";

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
      <section className="container px-4 lg:px-0 mx-auto grid grid-cols-12 gap-4 lg:gap-10 my-10">
        <LayoutWrapper styles="col-span-12 md:col-span-8 lg:col-span-9">
          <BreadCrumbs locale={params.locale} slug={params.slug} />
          <section className="flex flex-col h-full ">
            {children}
            <section>
              <OurPlatforms />
            </section>
          </section>
        </LayoutWrapper>
        <Sidebar />
      </section>
      <Footer />
    </section>
  );
}
