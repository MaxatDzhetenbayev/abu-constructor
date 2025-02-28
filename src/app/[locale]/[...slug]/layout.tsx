import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

import { LayoutWrapper } from "@/shared/ui";
import { BreadCrumbs, Header } from "@/widgets";
import { LastNews } from "@/widgets/common/LastNews";
import { OurPlatforms } from "@/widgets/common/OurPlatrorms";

const socials = [
  "/enbek/socials/Facebook.png",
  "/enbek/socials/Instagram.png",
  "/enbek/socials/Telegram.png",
  "/enbek/socials/TikTok.png",
];

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
      <section className="container px-4 md:0 mx-auto grid grid-cols-4 gap-10 my-10">
        <LayoutWrapper>
          <BreadCrumbs locale={params.locale} slug={params.slug} />
          <section className="flex flex-col h-full ">
            {children}
            <section>
              <OurPlatforms />
            </section>
          </section>
        </LayoutWrapper>
        <aside className="col-span-4 md:col-span-1">
          <LastNews />
        </aside>
      </section>
      <footer className="w-full  bg-abu_primary  py-4 md:py-0 h-full md:h-[218px] px-3 md:px-[70px] gap-3 grid grid-cols-1 md:grid-cols-3 items-center">
        <div></div>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-white text-3xl font-bold">БІЗГЕ ТІРКЕЛ!</h2>
          <div className="flex gap-4">
            {socials.map((s) => (
              <a>
                <Image src={s} alt={s} width={40} height={40} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white">
          <h2 className="text-2xl font-bold">Наши контакты</h2>
          <div className="flex gap-3">
            <MapPin />
            <span>Абай облысы, Семей қаласы, Т.Ұранхаев көшесі 53</span>
          </div>
          <div className="flex gap-3">
            <Phone />
            <span>
              <a href="tel:24-93-09">24-93-09</a>,{" "}
              <a href="tel:+7 700 956 98 10">+7 700 956 98 10</a>
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
