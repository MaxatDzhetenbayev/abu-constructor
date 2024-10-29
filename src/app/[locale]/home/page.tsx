"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GraduationCap, BookOpen, School, Shield } from "lucide-react";
import clsx from "clsx";
import { motion } from 'framer-motion'
import { Counter } from "@/widgets";
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

const news = [
  {
    title: "Диагностика профессорско-преподавательского состава Alikhan Bokeikhan University",
    date: "17 апреля, 2024",
    image: "/images/banner-2.jpeg",
  },
  {
    title: "Семестровое обучение в Indian Institute of Technology Bombay",
    date: "18 апреля, 2024",
    image: "/images/banner-3.jpeg",
  },
  {
    title: "Региональная студенческая олимпиада «Финансовая безопасность»",
    date: "19 апреля, 2024",
    image: "/images/banner-4.jpeg",
  },
  {
    title: "Встреча с представителями АО `Финансовый центр`",
    date: "20 апреля, 2024",
    image: "/images/banner-5.jpeg",
  },
]

export default function Page() {


  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".content",
  //       start: "top 20%",
  //       end: "bottom 30%",
  //       scrub: true,
  //       pin: true,
  //     },
  //   });

  //   tl.fromTo(".block-1", { opacity: 0 }, { opacity: 1, duration: 1 })
  //     .fromTo(
  //       ".block-2 li",
  //       { opacity: 0, y: -200 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1,
  //         stagger: 0.3,
  //         ease: "power2.out",
  //       }
  //     )
  //     .fromTo(".block-3", { opacity: 0 }, { opacity: 1, duration: 1 })
  //     .fromTo(".block-4", { opacity: 0 }, { opacity: 1, duration: 1 });
  // }, []);



  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <section className="w-full h-[500px] md:h-[750px] [@media(min-width:890px)]:-top-[96px] [@media(min-width:890px)]:relative">
        {/* <div className="absolute left-0 -top-20  w-full h-[100%] -z-10 bg-black/20"></div> */}
        <video
          muted
          loop
          autoPlay
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/hero-video.webm" type="video/webm"></source>
        </video>
      </section>
      <section className="flex justify-center">
      </section>
      <section className={clsx("content max-w-[1200px] mx-auto px-4 mt-8"
      )}>
        <section className=" flex flex-col items-center gap-4">
          <Swiper
            loop={true}
            autoplay={{ delay: 10000, }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            className="h-[300px] lg:h-[440px]  w-full"
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
          <motion.ul
            whileInView="visible"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2, // Задержка между анимацией каждого элемента
                },
              },
            }}
            className="block-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {educationPrograms.map((program, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: {
                    opacity: 1, y: 0, transition: {
                      type: 'spring',
                      stiffness: 120,
                      damping: 10,
                      delay: index * 0.2,
                    }
                  },
                }
                }
                className={`overflow-hidden bg-white shadow-lg transition-shadow  rounded-md`
                }
              >
                <section className="bg-[#640000] text-white p-4">
                  <h3 className="flex items-center text-xl font-semibold">
                    <program.icon className="w-6 h-6 mr-2" />
                    {program.title}
                  </h3>
                </section>
                <section className="p-6">
                  <p className="text-4xl font-bold text-[#640000]">
                    <Counter targetValue={program.count} />
                  </p>
                  <p className="text-sm text-gray-600">
                    образовательных программ
                  </p>
                </section>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* News sesction */}
        <section className="mt-16">
          <h2 className="font-bold text-[32px] text-abu_primary">НОВОСТИ И СОБЫТИЯ</h2>
          <section className="flex gap-3 flex-wrap mt-3">
            {news.map(({ date, image, title }, index) => (
              <article key={title} className="grow basis-[283px]">
                <div className="w-full h-[280px] relative">
                  <Image
                    src={image}
                    alt="news"
                    fill
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <section className="mt-[20px]">
                  <header >
                    <h2 className="text-[18px] font-bold ">
                      {title}
                    </h2>
                  </header >
                  <footer >
                    <p className="text-[#A3A3A3] text-[16px] mt-[6px]">
                      {date}
                    </p>
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
        <section className=" mt-16">
          <h2 className="font-bold text-[32px] text-abu_primary">ФАКТЫ О НАС</h2>
          <motion.ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 mt-3">
            {fact_list.map((item: any, index: number) => (
              // <TiltCard key={item.title}>
              <motion.li
                whileInView="visible"
                initial="hidden"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: {
                    opacity: 1, y: 0, transition: {
                      type: 'spring',
                      stiffness: 120,
                      damping: 10,
                      delay: index * 0.2,
                    }
                  },
                }}
                style={{
                  transform: "translateZ(30px)",
                }}
                key={index}
                className="bg-white h-[220px]  shadow-[0px_4px_15.3px_rgba(0,0,0,0.18)] p-3 rounded-[10px] flex flex-col items-center justify-center"
              >
                <div className="text-[42px] ">{item.icon}</div>
                <h3
                  className="last:text-white text-inherit  decoration-solid font-semibold"
                  style={{ fontSize: "clamp(36px, 1.6vw, 42px)" }}
                >
                  <Counter targetValue={item.count} />
                </h3>
                <p
                  className="text-center"
                  style={{ fontSize: "clamp(16px, 2vw, 21px)" }}
                >
                  {item.title}
                </p>
              </motion.li>
              // </TiltCard>
            ))}
          </motion.ul>
        </section>
        {/* President section */}
        <section className="mt-16 rounded-[10px] overflow-hidden">
          <div className="w-full  flex flex-col lg:grid grid-cols-[1fr,_2fr]">
            <motion.div
              transition={{ duration: 0.5 }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              initial={{
                opacity: 0,
                x: -100,
              }}
              className="lg:h-full h-[320px] relative hidden lg:block">
              <Image
                src="/images/president.jpg"
                alt="president"
                fill
                objectFit="cover"
              />
            </motion.div>
            <div className="p-5">
              <motion.h2
                transition={{ duration: 0.5 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                }}
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                className="text-3xl font-bold mb-4 text-[#640000]">
                ОБРАЩЕНИЕ ПРЕЗИДЕНТА
              </motion.h2>
              <motion.section className="flex flex-col gap-5">
                <motion.div
                  transition={{ duration: 0.5 }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                  }}
                  initial={{
                    opacity: 0,
                    x: -100,
                  }}
                  className="relative h-[60vh] md:h-[80vh] lg:hidden ">
                  <Image
                    src="/images/president.jpg"
                    alt="president"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
                <motion.div
                  transition={{ duration: 0.5 }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                  }}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  className=" pl-4 mt-3">
                  <p className="text-justify border-l-4 border-[#FFD700] pl-3">
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
                    прогреске жетелейді. Тәуелсіздік аңсаған Алаш ардақтыларыныңs
                    идеясын жүйелі түрде ілгерілету басты мақсатымыз бола
                    береді. Білімді ізгілендіру арқылы жоғары кәсіби біліктілігі
                    туралы дипломы бар маман ғана емес кемел Тұлға тәрбиелеу
                    игілікті, аяқталмайтын қызметіміз болып қала береді.
                  </p>
                  <p className="text-lg text-left font-semibold text-abu_primary">
                    Президент университета - Курманбаева Шырын Асылхановна
                  </p>
                </motion.div>

              </motion.section>
            </div>
          </div>
        </section>
        {/* Gallery section */}
        {/* <section className="mt-16">
          <h2 className="font-bold text-[32px] text-abu_primary">Галерея</h2>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="h-[540px] w-full mt-10"
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
        </section> */}
      </section>
    </main >
  );
}
