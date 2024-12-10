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
      <section
        className="bg-abu_primary min-h-5 w-full flex justify-between [@media(min-width:890px)]:justify-end px-4 fixed [@media(min-width:890px)]:static"
        style={{ gap: "clamp(20px, 1.5vw, 80px)" }}
      >
        <Logo isMobileView={true} size={LogoSize.SMALL} />
        <TopHeader />
        <section className="flex items-center gap-7">
          <SearchWidget />
          <ChangeLocale />
          <BurgerMenu />
        </section>
      </section>
      <Navbar />
    </header>
  );
};
