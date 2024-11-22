"use client";
import { useScroll } from "@/shared/lib/hooks/useScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { InputProps } from "@/shared/ui/input";
import { TextareaProps } from "@/shared/ui/textarea";
import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  School,
  Shield,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Script from "next/script";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../../globals.css";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const section_1 = [
  "58 образовательных программ",
  "2 современных общежития",
  "Военная кафедра",
  "Региональный технокластер Abai IT Valley",
  "Академическая мобильность",
];
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
    text: "Диагностика профессорско-преподавательского состава Alikhan Bokeikhan University",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-2.jpeg",
  },
  {
    text: "Семестровое обучение в Indian Institute of Technology Bombay",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-3.jpeg",
  },
  {
    text: "Региональная студенческая олимпиада «Финансовая безопасность»",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    img: "/images/banner-4.jpeg",
  },
];

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
  const scrolled = useScroll(40);
  const height = scrolled ? 94 : 134;
  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <section
        className={`w-full h-[500px] md:h-[750px] [@media(min-width:890px)]:-top-[96px] [@media(min-width:890px)]:relative`}
      >
        <AppealDialog />
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
      <section className=" flex flex-col gap-24 md:px-3 lg:px-0 ">
        <SectionOne />
        <PresidentSection />
        <Gallery />
        <News />
        <IELTS />
        <Partners />
        <Accreditation />
      </section>
    </main>
  );
}
const SectionOne = () => {
  return (
    <Container>
      <Heading className="mt-10 md:mt-0">Инфографика</Heading>
      <section className="flex justify-center flex-wrap xl:flex-nowrap   gap-5  rounded-md ">
        {section_1.map((s, idx) => (
          <section
            key={idx}
            className="flex items-center relative h-[10.75rem] rounded-md px-2.5 w-[17.875rem] bg-abu_primary "
          >
            <span className="text-white font-bold text-2xl">{s}</span>
            <Image
              className={clsx(
                "absolute left-1/2 -bottom-10   h-auto",
                {
                  1: "w-[9.188rem]",
                  2: "w-[5.688rem]",
                  3: "w-[8.25rem]",
                  4: "w-[10.5rem]",
                  5: "w-[10.375rem]",
                }[idx + 1]
              )}
              src={`/infograph/${idx + 1}.svg`}
              alt={`index-${idx + 1}`}
              width={100}
              height={100}
            />
          </section>
        ))}
      </section>
    </Container>
  );
};
const PresidentSection = () => {
  return (
    <section className="relative  min-h-[51.438rem]">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-abu_primary bg-opacity-95 bg-president" />
      <Container className="mt-16 rounded-[10px]    overflow-hidden text-white  ">
        <motion.h2
          transition={{ duration: 0.5 }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          initial={{
            opacity: 0,
            x: -100,
          }}
          className="text-4xl  font-bold mb-20  "
        >
          ОБРАЩЕНИЕ ПРЕЗИДЕНТА
        </motion.h2>

        <div className="w-full  flex flex-col lg:grid grid-cols-[30.438rem_1fr]">
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
            className="lg:h-full    relative hidden lg:block"
          >
            <Image
              src="/icons/president.png"
              alt="president"
              width={430}
              height={430}
              className="max-w-[30.438rem]  w-full h-auto  "
            />
            {/* <div className="h-[210px] w-full bg-abu_primary rounded-md absolute bottom-0  -z-10" /> */}
          </motion.div>
          <div className="pl-5">
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
                className="relative h-[50vh] md:h-[80vh] lg:hidden "
              >
                <Image
                  src="/icons/president.png"
                  alt="president"
                  width={430}
                  height={430}
                  className="max-w-[430px]  w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2 right-1/2"
                />
                <div className="h-[210px] w-full bg-abu_primary rounded-md absolute bottom-0  -z-10" />
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
                className=" pl-4  border-l-4 border-white min-h-[32.75rem] "
              >
                <p className="text-justify text-xl font-bold   pl-3">
                  Достар, Әлихан Бөкейхан университетінің ресми сайтына қош
                  келдіңіздер! Біз ерекше тарихи кезеңде өмір сүріп жатырмыз:
                  Әлем IV Өндірістік революция қарсаңында тұр. Шекарамен
                  белгіленбейтін білім беру кеңістігінің көкжиегі барынша
                  кеңейіп келеді. Оның айғағы – шетелдік университеттердің
                  қазақстандық жоғары оқу орындарында филиалдарының ашылуы.
                  Ұлттық менталитетіміз бен тарихи, мәдени құндылықтарымызды
                  барынша сақтай отырып, өзіндік қолтаңбасы бар іргелі оқу орны
                  болу миссиясына сәйкес, заман үндеуіне бейімделуге
                  міндеттіміз. Ақпараттық технология ағынынан қалыспай, Abai
                  IT-Walley арқылы Жасанды интеллектіні жұмыс стилі, өмір сүру
                  салты ретінде тұтынуына жол ашып, үздік тәжіибелер енгізу
                  жүйесі қарастырылуда. Жасанды интеллект – бүгінгі уақыттың күн
                  тәртібіндегі бірінші мәселе. Алаш көсемі Әлихан Бөкейхан «алда
                  күнді көре білетін ұрпақ келеді», - деп келешекке зор үмітпен
                  сенім артқаны белгілі. Кешегі күні қиял мен арман болған
                  бүгінгі күннің ақиқаты адамзатты жаңа тарихтағы прогреске
                  жетелейді. Тәуелсіздік аңсаған Алаш ардақтыларының идеясын
                  жүйелі түрде ілгерілету басты мақсатымыз бола береді. Білімді
                  ізгілендіру арқылы жоғары кәсіби біліктілігі туралы дипломы
                  бар маман ғана емес кемел Тұлға тәрбиелеу игілікті,
                  аяқталмайтын қызметіміз болып қала береді.
                </p>
                <p className="text-[2rem] italic text-right font-extrabold ">
                  С уважением,
                  <br />
                  Шырын Курманбаева{" "}
                </p>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </Container>
    </section>
  );
};
const Rector = ({ close }: { close?: ReactNode }) => {
  return (
    <Container className="relative rounded-xl md:rounded-3xl w-full max-h-[100svh] md:max-h-[54rem]  md:max-w-[70.875rem]   bg-abu_primary  mb-3 px-0 md:px-3">
      {close}
      <section className="px-0 py-12 lg:p-[4.3rem]">
        <Heading className="text-white text-center md:text-left">
          Обращение
        </Heading>
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 gap-y-4 lg:gap-4 ">
          <div className="flex flex-col gap-4 lg:gap-8">
            <RectorFormInput placeholder="ФИО" icon="/rector/user.svg" />
            <RectorFormInput
              placeholder="Почта"
              gap={false}
              icon="/rector/email.svg"
            />
            <RectorFormInput
              placeholder="Телефон"
              type="tel"
              gap={false}
              icon="/rector/tel.svg"
            />
          </div>
          <div className="flex flex-col gap-3 col-start-1 lg:col-start-2">
            <Select>
              <SelectTrigger className=" px-6 py-7 lg:py-9 rounded-[10rem]  text-abu_primary">
                <SelectValue placeholder={"Обращение"} />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="ru">Обращение</SelectItem>
                <SelectItem value="ru">Обращение к ректору</SelectItem>
                <SelectItem value="ru">Претензия</SelectItem>
                <SelectItem value="ru">Сообщение о коррупции</SelectItem>
              </SelectContent>
            </Select>
            <RectorFormTextarea
              className="min-h-[12.5rem]"
              placeholder="Текст сообщения"
              icon="/rector/message.svg"
            />
          </div>
          <button className="px-14 py-3 rounded-[5rem] col-span-2   w-full  text-center bg-[#FDC90C] text-[#1A0700]">
            Отправить
          </button>
        </form>
      </section>
    </Container>
  );
};
const gallery_1 = ["1", "2", "3", "4"];
const gallery_2 = ["5", "6", "7", "8"];
const Gallery = () => {
  return (
    <Container className="flex flex-col items-center xl:flex-row gap-5">
      <section className="grid  grid-cols-1  md:grid-cols-[35.375rem,1fr] gap-3">
        <section className="flex flex-col gap-10">
          <Heading>Галерея</Heading>
          <p>
            Добро пожаловать в фотогалерею нашего университета! Здесь мы собрали
            яркие и запоминающиеся моменты из жизни нашего университета,
            мероприятий и достижений студентов. В каждом альбоме вы сможете
            увидеть, чем живет наше учебное сообщество: научные исследования,
            творческие проекты, студенческую жизнь, спортивные события и многое
            другое. Мы гордимся успехами наших студентов и преподавателей,
            атмосферой вдохновения и взаимной поддержки, которые делают наш
            университет по-настоящему уникальным. Наслаждайтесь просмотром и
            присоединяйтесь к нашей большой университетской семье!
          </p>
          <button className="px-[4.25rem] w-fit rounded-[1.2rem] py-5 bg-abu_primary text-white font-bold text-3xl">
            ПОСМОТРЕТЬ
          </button>
        </section>
        <section>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            loop
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="gallery-swiper"
          >
            {gallery_1.map((i) => (
              <SwiperSlide key={i} className="gallery-swiper-slide">
                <img
                  src={`/icons/gallery/gallery1.jpeg`}
                  className="block w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </section>
    </Container>
  );
};
const SLcards = [
  {
    img: "/icons/sl1.png",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    text: "Студент 2 курса Диас Нуртаев стал обладателем серебряной награды на Международном турнире по смешанным единоборствам",
  },
  {
    img: "/icons/sl2.png",
    desc: "Работа педагога-учителя всегда была и будет одной самых ответственных работ",
    text: "Наши студенты заняли призовое 2 место на командных интеллектуальных играх",
  },
];
const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={clsx(
        "max-w-[1500px] font-raleway px-3  w-full mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
};
const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={clsx(
        "text-2xl lg:text-[2rem]  font-montserrat  pl-3 md:pl-0 lg:text-4xl  font-bold mb-4 md:mb-8 text-[#640000]",
        className
      )}
    >
      {children}
    </h2>
  );
};

const events = [
  {
    label: { n: 27, l: "ОКТ" },
    title: "Спортивные состязания факультетов",
    text: "Состоиться спортивные соревнование по разным дисциплинам",
    date: "27 октября 2024 года",
  },
  {
    label: { n: 27, l: "ОКТ" },
    title: "Спортивные состязания факультетов",
    text: "Состоиться спортивные соревнование по разным дисциплинам",
    date: "27 октября 2024 года",
  },

  {
    label: { n: 30, l: "ОКТ" },
    title: "Неделя науки и технологий",
    text: "Начиная с этой даты проходят научные выставки и конференции",
    date: "30 октября 2024 года",
  },
];
const Card = ({
  img,
  desc,
  text,
  className,
}: (typeof SLcards)[0] & { className?: string }) => {
  return (
    <section
      className={clsx(
        "py-4 px-5 max-h-[35rem] border flex flex-col gap-[.9rem] border-slate-200 rounded-md",
        className
      )}
    >
      <div className="h-[80%] overflow-hidden rounded-md">
        <img
          src={img}
          alt={text}
          className="block w-full object-cover   h-auto"
        />
      </div>
      <div>
        <h2 className="text-abu_primary font-semibold text-xl md:text-2xl">
          {text}
        </h2>
        <p className="text-[#3E3232] text-xl md:text-2xl ">{desc}</p>
      </div>
    </section>
  );
};
const AllButton = () => {
  return (
    <button className="flex py-3 w-full max-w-[31.625rem] justify-center items-center rounded-lg bg-abu_primary gap-2">
      <span className="text-2xl text-white font-bold">ВСЕ</span>
      <ArrowRight color="white" />
    </button>
  );
};
const Events = () => {
  return (
    <section className="flex flex-col justify-between gap-3  text-white  max-h-[35rem] ">
      <section className="bg-abu_primary h-[85%] overflow-y-auto flex flex-col gap-3 py-5 px-6 rounded-md">
        <div className="flex gap-2 ">
          <Image
            alt="event icon"
            src={"/icons/events.svg"}
            width={39}
            height={39}
          />
          <h3 className=" text-xl  lg:text-3xl  font-bold  ">Ивенты</h3>
        </div>
        {events.map((ev) => (
          <div key={ev.date} className="flex gap-3 ">
            <div className="w-[6.25rem] h-[5.313rem] px-3 rounded-md bg-[#FFCC00] flex items-center justify-center flex-col text-white font-bold">
              <span className="text-2xl font-bold">{ev.label.n}</span>
              <span className="text-md">{ev.label.l}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl w-full text-wrap lg:text-nowrap font-bold">
                {ev.title}
              </h3>
              <p className="text-md">{ev.text}</p>
            </div>
          </div>
        ))}
      </section>
      <AllButton />
    </section>
  );
};
const News = () => {
  return (
    <Container className="w-full ">
      <Heading>Новости события</Heading>
      <section className="w-full flex flex-col gap-4  ">
        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-5">
          <Card key={news[0].desc} {...news[0]} />
          <Events />
        </section>
        <section className="grid gap-3 grid-cols-1 md:grid-cols-2">
          {news.slice(0, 1).map((card) => (
            <Card key={card.desc} {...card} />
          ))}
        </section>
        <AllButton />
      </section>
    </Container>
  );
};

const partners = Array(3)
  .fill([
    { name: "ABAI IT VALLEY", img: "/aiv.svg" },
    { name: "ASTANA HUB", img: "/ah.png" },
    { name: "FREEDOM BROKER", img: "/free.png" },
    { name: "HUAWEI", img: "/h.png" },
    { name: "Акимат города Семей", img: "/a.png" },
    { name: "", img: "/partners/1.webp" },
    { name: "", img: "/partners/2.png" },
    { name: "", img: "/partners/3.webp" },
    { name: "", img: "/partners/4.webp" },
    { name: "", img: "/partners/5.webp" },
    { name: "", img: "/partners/6.webp" },
    { name: "", img: "/partners/7.webp" },
    { name: "", img: "/partners/8.webp" },
    { name: "", img: "/partners/9.svg" },
    { name: "", img: "/partners/10.webp" },
  ])
  .flat();
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 2.5;
const DRAG_BUFFER = 20;

const SPRING_OPTIONS = {
  type: "tween",
  ease: "linear", // Smooth ease-in-out easing
  duration: 0.3,
};

const PartnersSlider = () => {
  // Duplicate the slides array to ensure seamless looping
  const duplicatedSlides = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Wrapping div for seamless looping */}
      <motion.div
        className="flex"
        animate={{
          x: ["-100%", "0%"],
          transition: {
            ease: "linear",
            duration: 10,
            repeat: Infinity,
          },
        }}
      >
        {/* Render duplicated slides */}
        {duplicatedSlides.map(({ img, name }, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-3  flex items-center justify-center bg-white"
            style={{ width: "clamp(10rem, 1rem + 40vmin, 30rem)" }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="px-3 py-2 bg-white flex flex-col items-center text-xl gap-3">
                <img
                  src={`/icons${img}`}
                  className="w-24 md:w-32 lg:w-48" // Adjust image size with breakpoints
                  alt={name}
                />
                <h2 className="text-base md:text-lg lg:text-xl">{name}</h2>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
const PartnersCarousel = () => {
  const centeredEl = useRef(2);
  const elPerView = useRef(5);
  const [imgIndex, setImgIndex] = useState(centeredEl.current);
  const dir = useRef("r");
  const dragX = useMotionValue(0);
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 1200) {
        centeredEl.current = 2;
        elPerView.current = 5;
        return;
      }
      if (window.innerWidth < 1200 && window.innerWidth > 756) {
        centeredEl.current = 1;
        elPerView.current = 3;
        return;
      }
      centeredEl.current = 0;
      elPerView.current = 1;
    };
    resize();
    if (window) {
      window.addEventListener("resize", resize);
    }
    return () => removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          const { current: dirValue } = dir;

          if (dirValue && dirValue == "r") {
            const res = (pv + 1) % (partners.length - centeredEl.current);
            if (res == 0) {
              dir.current = "l";
              return pv - 1;
            }
            return res;
          } else {
            const res = pv - 1;
            //centered == 2 => res = 1
            //centered == 1 => res = 0
            //centered == 0 => res = -1
            if (res == centeredEl.current - 1) {
              dir.current = "r";
              return pv + 1;
            }
            return res;
          }
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (
      x <= -DRAG_BUFFER &&
      imgIndex < partners.length - 1 - centeredEl.current
    ) {
      setImgIndex((pv) => pv + 1);
      dir.current = "r";
    } else if (x >= DRAG_BUFFER && imgIndex > centeredEl.current) {
      setImgIndex((pv) => pv - 1);
      dir.current = "l";
    }
  };
  const getImageScale = (idx: number) => {
    if (idx == imgIndex - 2 || idx == imgIndex + 2) {
      return 0.7;
    }
    if (idx == imgIndex - 1 || idx == imgIndex + 1) {
      return 0.75;
    }
    if (idx == imgIndex) {
      return 0.9;
    }
    return 0.5;
  };

  const getImageTranslateY = (idx: number) => {
    if (idx == imgIndex - 2 || idx == imgIndex + 2) {
      return 10;
    }

    if (idx == imgIndex - 1 || idx == imgIndex + 1) {
      return 50;
    }
    if (idx == imgIndex) {
      return 100;
    }
    return -100;
  };

  const circleRef = useRef<HTMLDivElement>(null);
  return (
    <div className=" max-w-[18.75rem] md:max-w-full w-full   pt-28 md:pt-40  flex justify-center overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${(imgIndex - centeredEl.current) * (100 / elPerView.current)}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className=" flex w-full min-h-[20rem] gap-0 cursor-grab  active:cursor-grabbing"
      >
        {partners.map((i, idx) => (
          <motion.div
            ref={circleRef}
            key={idx}
            style={{
              width: 100 / elPerView.current + "%",
              height: circleRef.current?.offsetWidth,
            }}
            className="flex shadow-white/40 shadow-2xl p-3 min-h-[16.875rem] items-center relative flex-col  overflow-hidden flex-none justify-center   rounded-full bg-white"
            animate={{
              scale: getImageScale(idx),
              y: -getImageTranslateY(idx),
            }}
          >
            <div
              style={{
                backgroundImage: `url(/icons${i.img})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-[60%] h-[60%]" // Ensure both width and height are set
            />
            <h2 className="font-bold text-center text-md md:text-lg lg:text-xl text-abu_primary">
              {i.name}
            </h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
const Dots = () => {
  return (
    <div className="flex gap-5 mt-5  ">
      {Array(7)
        .fill("*")
        .map((_, idx) => (
          <div
            key={idx}
            className={clsx(
              " h-5  rounded-full",
              idx == 3 ? "w-10 bg-white" : "w-5 bg-white/60"
            )}
          />
        ))}
    </div>
  );
};
const Partners = () => {
  return (
    <section className="bg-abu_primary py-20">
      <Container className="grid place-items-center   ">
        <Heading className="text-center font-bold   mb-[37px] text-white">
          НАШИ ПАРТНЕРЫ
        </Heading>
        {/* <PartnersSlider /> */}
        <PartnersCarousel />
        <Dots />
      </Container>
    </section>
  );
};
const socials = ["/vk.png", "inst.png", "fb.png", "yt.png", "in.png"];
const Accreditation = () => {
  const locale = useParams().locale;
  return (
    <Container className="px-2 md:px-0">
      <div className="flex gap-5 items-center mb-[3.938rem] justify-center md:justify-end">
        <Heading className="md:mb-0">
          Аккредитация <br /> и признание
        </Heading>
        <img
          src="/icons/accre.png"
          className="w-[6rem] md:w-[10.375rem] h-auto"
        />
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
        {getMap({ locale: locale as string })}
        <div className="flex flex-col gap-5">
          <div className="bg-abu_primary rounded-md text-white p-10 flex flex-col gap-4 text-2xl min-h-[216px]">
            <h3 className="text-4xl font-bold">Наши контакты</h3>
            <a href="tel:+7 (7222) 42-32-24">+7 (7222) 42-32-24</a>
            <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
          </div>
          <div className="bg-abu_primary rounded-md text-white p-10 min-h-[216px]">
            <h3 className="text-4xl mb-[35px] font-bold">Социальные сети</h3>
            <div className="flex gap-2">
              {socials.map((s) => (
                <img
                  key={s}
                  src={`/icons/${s}`}
                  className="w-[46px] h-[46px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
const TwoGisMap = () => {
  useEffect(() => {
    const existingScript = document.getElementById("map-script");
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement("script");
    script.id = "map-script";
    script.src = "/map.js"; // Path to your custom script
    script.async = true;

    // Append the new script to the document
    document.body.appendChild(script);

    // Cleanup function to remove the script if component unmounts
    return () => {
      script.remove();
    };
  }, []);
  return (
    <div>
      <Script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" />
      <Script id="map-script" src="/map.js" strategy="beforeInteractive" />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          display: "block",
        }}
      ></div>
    </div>
  );
};
const ielts = [
  { img: "/icons/ielts-1.jpg", link: "https://ielts.kz/" },
  { img: "/icons/ielts-2.jpg", link: "https://ielts.idp.com/book" },
];
const IELTS = () => {
  return (
    <Container>
      <Heading>IELTS</Heading>
      <section className="flex flex-col items-center  md:flex-row md:justify-center gap-10">
        {ielts.map((i) => (
          <a href={i.link} target="_blank" key={i.link}>
            <img className="max-w-[300px]" src={i.img} alt="ielts" />
          </a>
        ))}
      </section>
    </Container>
  );
};
const getMap = ({ locale }: { locale: string }) => {
  if (locale == "ru" || locale == "kz") {
    return <TwoGisMap />;
  }
  return (
    <iframe
      className="w-full h-full rounded-md"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.8354972776897!2d80.24475957676113!3d50.40690329049805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f2653b6778ca47%3A0xc602e68a1b22b35e!2zQWxpa2hhbiBCb2tlaWtoYW4gVW5pdmVyc2l0eSAo05jQu9C40YXQsNC9INCR06nQutC10LnRhdCw0L3QvtCyINGD0L3QuNCy0LXRgNGB0LjRgtC10YLRlik!5e0!3m2!1sru!2skz!4v1730443037797!5m2!1sru!2skz"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

const AppealDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger className="fixed z-[30] right-0 top-1/2 -translate-y-1/2 lg:p-5 p-3 bg-slate-200 border border-slate-300 rounded-tl-md rounded-bl-md  cursor-pointer ">
        <Image
          src={"/icons/appeal.svg"}
          alt="appeal-trigger"
          width={32}
          height={17}
        />
      </DialogTrigger>
      <DialogContent className=" bg-opacity-0 bg-black border-none ">
        <DialogHeader>
          <DialogTitle className="opacity-0"></DialogTitle>
          <DialogDescription className="opacity-0"></DialogDescription>
        </DialogHeader>
        <div className="">
          <Rector
            close={
              <X
                onClick={() => setOpen(false)}
                className="absolute right-5 cursor-pointer top-5 "
                color="white"
              />
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface RectorFormInput extends InputProps {
  icon: string;
  className?: string;
}
const RectorFormInput = ({
  icon,
  className,
  ...inputProps
}: RectorFormInput) => {
  return (
    <div className="relative  w-full">
      <Image
        src={icon}
        alt="input-icon"
        width={20}
        height={20}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
      />
      <input
        className={`pl-16  pr-3 lg:py-6 py-4 text-md w-full border border-gray-300 rounded-[5rem]  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
        {...inputProps}
      />
    </div>
  );
};
interface RectorFormTextarea extends TextareaProps {
  icon: string;
  className?: string;
}
const RectorFormTextarea = ({
  icon,
  className,
  ...textareaProps
}: RectorFormTextarea) => {
  return (
    <div className="relative  w-full">
      <Image
        src={icon}
        alt="input-icon"
        width={20}
        height={20}
        className="absolute left-8 top-7 transform  text-gray-500 z-10"
      />
      <textarea
        className={`pl-16  pr-3 lg:py-6  py-4 text-md w-full border border-gray-300 rounded-[3rem]  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
        {...textareaProps}
      />
    </div>
  );
};
