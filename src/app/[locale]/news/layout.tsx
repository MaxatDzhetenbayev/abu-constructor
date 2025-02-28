import { Metadata } from "next";
import { ReactNode } from "react";

import { Footer } from "@/features/home";
import { Header } from "@/widgets";

export const metadata: Metadata = {
  title: "КГУ «ЦЕНТР ТРУДОВОЙ МОБИЛЬНОСТИ ОБЛАСТИ АБАЙ»"
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      <main className=" min-h-[100svh] max-w-[1200px] mx-auto mt-20 lg:p-0 p-3">
        {children}
      </main>
      <Footer />
    </section>
  );
}
