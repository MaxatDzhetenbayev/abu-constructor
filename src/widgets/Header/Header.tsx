import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="relative  flex flex-col   w-full ">
      <section className="bg-red-950 min-h-10 flex gap-6 justify-end gap-6 pr-3 ">
        <section className="flex gap-3">
          <Link href="/main">Обучающимся</Link>
          <Link href="/main">Международный отдел</Link>
          <Link href="/main">Выпусникам</Link>
          <Link href="/main">AIS</Link>
          <Link href="/main">Abai IT</Link>
        </section>
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <Navbar />
    </header>
  );
};
