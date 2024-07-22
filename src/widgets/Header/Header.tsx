import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/Header/Navbar";

export const Header = () => {
  return (
    <header className="relative  flex flex-col   w-full ">
      <section className="bg-red-950 min-h-10 flex gap-6 justify-end pr-3 ">
        <ChangeLocale />
        <BurgerMenu />
      </section>
      <Navbar />
    </header>
  );
};
