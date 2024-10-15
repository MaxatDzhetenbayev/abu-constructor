"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { gsap } from "gsap";
import TiltCard from "@/shared/ui/cards/TiltCard";
import { GraduationCap, BookOpen, School, Shield } from "lucide-react";
import { useScroll } from "@/shared/lib/hooks/useScroll";
export default function Page() {
  const fact_list = [
    {
      count: 45,
      title: "Специальностей",
      icon: "🎓",
    },
    {
      count: 10,
      title: "Молодежных организаций",
      icon: "🤝",
    },
    {
      count: 8,
      title: "Учебных корпусов",
      icon: "🏛️",
    },
    {
      count: 1998,
      title: "Год создания университета",
      icon: "📅",
    },
  ];

  const educationPrograms = [
    {
      title: "Бакалавриат",
      count: 29,
      icon: GraduationCap,
      color: "bg-blue-100",
    },
    { title: "Магистратура", count: 10, icon: BookOpen, color: "bg-green-100" },
    { title: "Докторантура", count: 6, icon: School, color: "bg-yellow-100" },
    { title: "Военная кафедра", count: 10, icon: Shield, color: "bg-red-100" },
  ];

  const [scrolled] = useScroll(40);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".content",
        start: "top 20%",
        end: "bottom 30%",
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(".block-1", { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(
        ".block-2 li",
        { opacity: 0, x: -200 }, // Стартовые значения - элемент за пределами экрана и невидим
        {
          opacity: 1,
          x: 0, // Элементы возвращаются в исходное положение
          duration: 1,
          stagger: 0.3, // Задержка между появлением каждого элемента
          ease: "power2.out", // Плавная анимация
        }
      )
      .fromTo(".block-3", { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(".block-4", { opacity: 0 }, { opacity: 1, duration: 1 });
  }, []);

  return (
    <main className="w-full h-full overflow-hidden ">
      <section>
        {/* <DotsCanvas /> */}
        <div className="absolute left-0 top-0  w-full h-full -z-10 bg-black/20"></div>
        <video
          muted
          loop
          autoPlay
          playsInline
          className="absolute left-0 top-0  w-full h-full object-cover -z-20 "
        >
          <source src="/hero-video.webm" type="video/webm"></source>
        </video>
      </section>
      <section className="content max-w-[1200px] mx-auto px-4 mt-24">
        {/* Hero section */}
        <section className="block-1 opacity-0 flex flex-col items-center gap-4">
          <Swiper
            pagination={true}
            direction="vertical"
            modules={[Pagination]}
            className="lg:h-[440px] h-[50vh] w-full"
          >
            {[2, 1].map((id) => (
              <SwiperSlide className="relative" key={id}>
                <Image
                  src={`/images/banner-${id}.jpeg`}
                  alt="slide"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[10px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        {/* List */}
        <section className="mt-16">
          <ul className="block-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationPrograms.map((program, index) => (
              <li
                key={index}
                className={`overflow-hidden ${program.color} shadow-lg transition-shadow opacity-0 rounded-md`}
              >
                <section className="bg-[#640000] text-white p-4">
                  <section className="flex items-center text-xl font-semibold">
                    <program.icon className="w-6 h-6 mr-2" />
                    {program.title}
                  </section>
                </section>
                <section className="p-6">
                  <p className="text-4xl font-bold text-[#640000]">
                    {program.count}
                  </p>
                  <p className="text-sm text-gray-600">
                    образовательных программ
                  </p>
                </section>
              </li>
            ))}
          </ul>
        </section>

        {/* News sesction */}
        <section className="block-3 opacity-0 mt-16">
          <h2 className="font-bold text-[32px]">НОВОСТИ И СОБЫТИЯ</h2>
          <section className="flex gap-3 flex-wrap mt-3">
            {[1, 2, 3, 4].map((id) => (
              <article key={id} className="grow basis-[283px]">
                <div className="w-full h-[280px] relative">
                  <Image
                    src="/images/banner-2.jpeg"
                    alt="news"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <section className="mt-[20px]">
                  <header>
                    <h2 className="text-[18px] font-bold ">
                      Диагностика профессорско-преподавательского состава
                      Alikhan Bokeikhan University
                    </h2>
                    <p className="text-[#A3A3A3] text-[16px] mt-[6px]">
                      17 апреля, 2024
                    </p>
                  </header>
                  <footer className="mt-[12px]">
                    <button className="text-[#640000] font-bold">
                      Подробнее
                    </button>
                  </footer>
                </section>
              </article>
            ))}
          </section>
        </section>
        {/* Facts section */}
        <section className="block-4 opacity-0 mt-16">
          <h2 className="font-bold text-[32px]">ФАКТЫ О НАС</h2>
          <section className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 mt-3">
            {fact_list.map((item: any, index: number) => (
              <TiltCard>
                <article
                  style={{
                    transform: "translateZ(30px)",
                  }}
                  key={index}
                  className="bg-white h-[220px]  shadow-[0px_4px_23.3px_rgba(0,0,0,0.18)] p-3 rounded-[10px] flex flex-col items-center justify-center"
                >
                  <div className="text-[42px] ">{item.icon}</div>
                  <h3
                    className="last:text-white text-inherit  decoration-solid font-semibold"
                    style={{ fontSize: "clamp(36px, 1.6vw, 42px)" }}
                  >
                    {item.count}
                  </h3>
                  <p
                    className="text-center"
                    style={{ fontSize: "clamp(16px, 2vw, 21px)" }}
                  >
                    {item.title}
                  </p>
                </article>
              </TiltCard>
            ))}
          </section>
        </section>
        {/* President section */}
        <section className="mt-16 rounded-[10px] overflow-hidden">
          <div className="w-full  flex flex-col lg:grid grid-cols-[1fr,_2fr]  ">
            <div className="lg:h-full h-[320px] relative hidden lg:block">
              <Image
                src="/images/president.jpg"
                alt="president"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-3xl font-bold mb-4 text-[#640000]">
                ОБРАЩЕНИЕ ПРЕЗИДЕНТА
              </h2>
              <section className="flex flex-col gap-5">
                <div className="relative h-[60vh] md:h-[80vh]   lg:hidden ">
                  <Image
                    src="/images/president.jpg"
                    alt="president"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="border-l-4 border-[#FFD700] pl-4 mb-4">
                  <p className="text-justify">
                    Достар, Әлихан Бөкейхан университетінің ресми сайтына қош
                    келдіңіздер! Біз ерекше тарихи кезеңде өмір сүріп жатырмыз:
                    Әлем IV Өндірістік революция қарсаңында тұр. Шекарамен
                    белгіленбейтін білім беру кеңістігінің көкжиегі барынша
                    кеңейіп келеді. Оның айғағы – шетелдік университеттердің
                    қазақстандық жоғары оқу орындарында филиалдарының ашылуы.
                    Ұлттық менталитетіміз бен тарихи, мәдени құндылықтарымызды
                    барынша сақтай отырып, өзіндік қолтаңбасы бар іргелі оқу
                    орны болу миссиясына сәйкес, заман үндеуіне бейімделуге
                    міндеттіміз. Ақпараттық технология ағынынан қалыспай, Abai
                    IT-Walley арқылы Жасанды интеллектіні жұмыс стилі, өмір сүру
                    салты ретінде тұтынуына жол ашып, үздік тәжіибелер енгізу
                    жүйесі қарастырылуда. Жасанды интеллект – бүгінгі уақыттың
                    күн тәртібіндегі бірінші мәселе. Алаш көсемі Әлихан Бөкейхан
                    «алда күнді көре білетін ұрпақ келеді», - деп келешекке зор
                    үмітпен сенім артқаны белгілі. Кешегі күні қиял мен арман
                    болған бүгінгі күннің ақиқаты адамзатты жаңа тарихтағы
                    прогреске жетелейді. Тәуелсіздік аңсаған Алаш ардақтыларының
                    идеясын жүйелі түрде ілгерілету басты мақсатымыз бола
                    береді. Білімді ізгілендіру арқылы жоғары кәсіби біліктілігі
                    туралы дипломы бар маман ғана емес кемел Тұлға тәрбиелеу
                    игілікті, аяқталмайтын қызметіміз болып қала береді.
                  </p>
                </div>
                <p className="text-lg font-semibold text-[#8B0000]">
                  Университет президенті - Курманбаева Шырын Асылхановна
                </p>
              </section>
            </div>
          </div>
        </section>
        {/* Gallery section */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px]">Галлерея</h2>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="h-[540px] w-full"
          >
            <SwiperSlide className="relative">
              <Image
                src={`/images/gallery/1.png`}
                alt="slide"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </SwiperSlide>
            <SwiperSlide className="relative">
              <Image
                src={`/images/gallery/2.png`}
                alt="slide"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </SwiperSlide>
            <SwiperSlide className="relative">
              <Image
                src={`/images/gallery/3.png`}
                alt="slide"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </SwiperSlide>
            <SwiperSlide className="relative">
              <Image
                src={`/images/gallery/4.png`}
                alt="slide"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </SwiperSlide>
            <SwiperSlide className="relative">
              <Image
                src={`/images/gallery/5.png`}
                alt="slide"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
            </SwiperSlide>
          </Swiper>
          {/* <section className="mt-4 grid grid-cols-[1fr_1fr_300px] gap-2 ">
            <img
              className="row-span-1 col-span-1 rounded-md"
              src="/images/gallery/1.png"
              alt="gallery-image-1"
            />
            <img
              className="row-start-1 col-start-2 rounded-md"
              src="/images/gallery/2.png"
              alt="gallery-image-2"
            />
            <img
              className="row-start-2 col-span-1 rounded-md"
              src="/images/gallery/3.png"
              alt="gallery-image-3"
            />
            <img
              className="row-start-2 col-start-2 rounded-md"
              src="/images/gallery/4.png"
              alt="gallery-image-4"
            />
            <img
              className="col-start-3 h-full row-span-2 object-cover rounded-md"
              src="/images/gallery/5.png"
              alt="gallery-image-5"
            />
          </section> */}
        </section>
      </section>
    </main>
  );
}
