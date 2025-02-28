import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { LayoutWrapper } from "@/shared/ui";
import { BreadCrumbs, Header } from "@/widgets";
import { LastNews } from "@/widgets/common/LastNews";
import { OurPlatforms } from "@/widgets/common/OurPlatrorms";

const socials = [
  {
    link: "https://www.facebook.com/share/1D3oDLZEuy/?mibextid=wwXIfr",
    icon: "/enbek/socials/Facebook.png",
  },
  {
    link: "https://www.instagram.com/abai_emo?igsh=c2F4czJzdHExMm9s",
    icon: "/enbek/socials/Instagram.png",
  },
  {
    link: "https://t.me/abai_emo",
    icon: "/enbek/socials/Telegram.png",
  },
  {
    link: "https://www.tiktok.com/@abai_emo?_t=ZM-8uGDpD5ArNn&_r=1",
    icon: "/enbek/socials/TikTok.png",
  },
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
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <LastNews />
        </aside>
      </section>
      <footer className="bg-abu_primary">
        <section className="container px-4 py-8 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
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
          <div className="flex flex-col gap-5">
            <h2 className="text-white text-2xl font-bold">Бізге тіркел!</h2>
            <div className="flex gap-4">
              {socials.map(({ icon, link }, index) => (
                <Link href={link} target="_blank" key={index}>
                  <Image src={icon} alt={link} width={40} height={40} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </footer>
    </section>
  );
}
