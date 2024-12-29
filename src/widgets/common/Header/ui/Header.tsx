import { Navbar, TopHeader } from "@/features";

export const Header = () => {
  return (
    <header className="relative z-50  flex flex-col  w-full">
      <TopHeader />
      <Navbar />
    </header>
  );
};
