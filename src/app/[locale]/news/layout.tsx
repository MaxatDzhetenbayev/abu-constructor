import { Separator } from "@/shared/ui";
import { Header } from "@/widgets";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Alikhan Bokeikhanov University",
};

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  return (
    <section>
      <Header />
      <main className=" min-h-[100svh] pb-10">{children}</main>
      <footer className="w-full  bg-abu_primary">
        <div className=" max-w-[1200px] mx-auto p-10 ">
          <div className=" flex justify-between items-center mb-10">
            <div className="flex flex-col gap-4  text-white">
              <h2 className="text-2xl">Наши контакты</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <Phone />
                  <a href="tel:+7 7222 42-32-24">+7 (7222) 42-32-24</a>
                </div>
                <div className="flex gap-4">
                  <Mail />
                  <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
                </div>
                <div className="flex gap-4">
                  <MapPin />
                  <span>Область Абай, г. Семей, ул. Мәңгілік Ел, 11</span>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <span className="text-white block mt-4">
            ©{new Date().getFullYear()} Все права защищены.
          </span>
        </div>
      </footer>
    </section>
  );
}