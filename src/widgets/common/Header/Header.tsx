import { ChangeLocale } from "@/features";
import { BurgerMenu } from "@/widgets";
import { Navbar } from "@/widgets/common/Header/Navbar";
import { SearchWidget } from "../SearchWidget/SearchWidget";
import { TopHeader } from "@/entities/top-header";
import { Logo } from "@/entities/logo";
import { LogoSize } from "@/entities/logo/model";

export const Header = () => {
  return (
    <header className="relative z-50  flex flex-col  w-full">
      <TopHeader />
      <Navbar />
    </header>
  );
};
