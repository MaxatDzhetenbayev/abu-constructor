'use client';
import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Header = () => {

  const params = useParams();

  return (
    <header className="relative  flex flex-col gap-10 w-full ">
      <section className="bg-red-950 min-h-10 flex gap-20 justify-end  pr-3 ">
        <section className="flex gap-10 text-white items-center">
          <Link href={`/${params.locale}/main`}>Обучающимся</Link>
          <Link href={`/${params.locale}/main`}>Международный отдел</Link>
          <Link href={`/${params.locale}/main`}>Выпусникам</Link>
          <Link href={`/${params.locale}/main`}>AIS</Link>
          <Link href={`/${params.locale}/main`}>Abai IT</Link>
        </section>
        <section className="flex items-center">
          <ChangeLocale />
          <BurgerMenu />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
