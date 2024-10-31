"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, GraduationCap, School, Shield } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Script from "next/script";
import { useParams } from "next/navigation";
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
    date: "17.04.2024",
    img: "/images/banner-2.jpeg",
  },
  {
    text: "Семестровое обучение в Indian Institute of Technology Bombay",
    date: "18.04.2024",
    img: "/images/banner-3.jpeg",
  },
  {
    text: "Региональная студенческая олимпиада «Финансовая безопасность»",
    date: "19.04.2024",
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

  return (
    <main className="w-full h-full">
      {/* Hero section */}
      <section className="w-full h-[500px] md:h-[1100px] [@media(min-width:890px)]:-top-[96px] [@media(min-width:890px)]:relative">
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
        <StudentLife />
        <News />
        <Partners />
        <Accreditation />
      </section>
    </main>
  );
}
const SectionOne = () => {
  return (
    <Container className="flex justify-center flex-wrap gap-5  ">
      {section_1.map((s, idx) => (
        <section
          key={idx}
          className="flex h-[121px] w-[373px]  items-center p-[27px] justify-center gap-2 border-2 rounded-md  border-abu_primary"
        >
          <div className="w-[65px] flex items-center justify-center   h-[65px] bg-abu_primary rounded-full">
            <Image
              className=""
              src={`/icons/${idx + 1}.png`}
              alt="icon"
              width={39}
              height={39}
            />
          </div>
          <span className="w-[232px] text-xl font-bold text-abu_primary">
            {s}
          </span>
        </section>
      ))}
    </Container>
  );
};
const PresidentSection = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-abu_primary bg-opacity-95 bg-president" />
      <Container className="mt-16 rounded-[10px]  overflow-hidden text-white  ">
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
          className="text-5xl font-bold mb-4 "
        >
          ОБРАЩЕНИЕ ПРЕЗИДЕНТА
        </motion.h2>

        <div className="w-full  flex flex-col lg:grid grid-cols-[1fr_1fr]">
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
            className="lg:h-full h-[320px] relative hidden lg:block"
          >
            <Image
              src="/icons/president.png"
              alt="president"
              width={430}
              height={430}
              className="max-w-[430px]  w-full h-auto absolute bottom-0 left-1/2 -translate-x-1/2 right-1/2"
            />
            {/* <div className="h-[210px] w-full bg-abu_primary rounded-md absolute bottom-0  -z-10" /> */}
          </motion.div>
          <div className="p-5">
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
                className="relative h-[60vh] md:h-[80vh] lg:hidden "
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
                className=" pl-4 mt-3 border-l-4 border-[#FFD700]"
              >
                <p className="text-justify  pl-3">
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
                <p className="text-lg text-right font-semibold ">
                  Президент университета <br /> Курманбаева Шырын Асылхановна
                </p>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </Container>
    </section>
  );
};
const gallery_1 = ["1", "2", "3", "4"];
const gallery_2 = ["1", "2", "3", "4"];
const Gallery = () => {
  return (
    <Container className="flex flex-col items-center xl:flex-row gap-5">
      <section className="grid grid-cols-[repeat(4,129px)]  grid-rows-[129px,129px] gap-5">
        {gallery_1.map((i, idx) => (
          <div
            className={clsx(
              "bg-slate-300 rounded-md",
              {
                0: "col-start-1 col-end-3 row-span-2",
                3: "col-start-3 col-end-5",
              }[idx],
            )}
            key={idx}
          />
        ))}
      </section>
      <section className="grid grid-cols-[repeat(4,129px)] grid-rows-[129px,129px] gap-5">
        {gallery_1.map((i, idx) => (
          <div
            className={clsx(
              "bg-slate-300 rounded-md",
              {
                0: "col-start-1 col-end-3 row-span-2",
                1: "col-start-3 col-end-5",
              }[idx],
            )}
            key={idx}
          />
        ))}
      </section>
    </Container>
  );
};
const SLcards = [
  {
    img: "/icons/sl1.png",
    date: "18.10.24",
    text: "Студент 2 курса Диас Нуртаев стал обладателем серебряной награды на Международном турнире по смешанным единоборствам",
  },
  {
    img: "/icons/sl2.png",
    date: "18.10.24",
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
    <section className={clsx("max-w-[1200px] w-full mx-auto", className)}>
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
        " text-3xl pl-3 md:pl-0 lg:text-4xl  font-bold mb-4 text-[#640000]",
        className,
      )}
    >
      {children}
    </h2>
  );
};
const StudentLife = () => {
  return (
    <Container className="grid md:grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] overflow-hidden    place-items-center">
      <Heading>
        Студенческая <br className="2xl:block hidden" /> жизнь в{" "}
        <br className="2xl:block hidden" /> нашем вузе
      </Heading>
      <Carousel
        // opts={{ loop: true }}
        className="w-full max-w-[25rem]   md:max-w-3xl lg:max-w-[53rem] "
      >
        <CarouselContent className="-ml-14">
          {SLcards.map((card) => (
            <CarouselItem
              className="w-[394px]   pl-14  md:basis-1/2 "
              key={card.img}
            >
              <Card {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

const Card = ({
  img,
  date,
  text,
  className,
}: (typeof SLcards)[0] & { className?: string }) => {
  return (
    <section
      className={clsx(
        "w-[394px] h-[402px]  rounded-md relative overflow-hidden",
        className,
      )}
    >
      <Image src={img} alt="photo card" fill className="" />
      <div className=" relative flex flex-col justify-end h-full text-white  p-6 pb-7  ">
        <div className="min-h-[33%] absolute top-[60%] z-20 font-bold flex gap-5 flex-col  items-start ">
          <span className="px-3 py-0  border border-white rounded-xl  w-fit">
            {date}
          </span>
          <p className="">{text}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-[45%] bg-gradient-to-t from-black/80 to-black/5 bg-opacity-60 z-10" />
      </div>
    </section>
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
    label: { n: 30, l: "ОКТ" },
    title: "Неделя науки и технологий",
    text: "Начиная с этой даты проходят научные выставки и конференции",
    date: "30 октября 2024 года",
  },
];
const News = () => {
  return (
    <Container className="w-full ">
      <Heading>Новости события</Heading>
      <section className="w-full flex flex-col md:flex-row ">
        <section className="flex gap-4 flex-wrap w-full justify-center">
          {news.map((card) => (
            <CardWithHover key={card.date} {...card} />
          ))}
        </section>
        <section className="px-3 flex flex-col gap-3">
          <h3 className=" text-xl  lg:text-3xl  font-bold mb-4 text-[#640000]">
            Ивенты
          </h3>
          {events.map((ev) => (
            <div key={ev.date} className="flex gap-3 ">
              <div className="w-[3.75rem] h-[3.75rem] px-3 rounded-md bg-abu_primary flex items-center justify-center flex-col text-white font-bold">
                <span className="text-3xl">{ev.label.n}</span>
                <span className="text-md">{ev.label.l}</span>
              </div>
              <div>
                <h3 className="text-[15px]">{ev.title}</h3>
                <p className="text-[12px]">{ev.text}</p>
                <span className="text-[12px]">{ev.date}</span>
              </div>
            </div>
          ))}
        </section>
      </section>
    </Container>
  );
};

const CardWithHover = ({
  img,
  date,
  text,
  className,
}: (typeof SLcards)[0] & { className?: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      // onHoverStart={() => setHover(true)}
      // onHoverEnd={() => {
      //   setHover(false);
      // }}
      className="flex flex-col justify-between relative overflow-hidden rounded-md " // Add additional styling here
      initial={{ width: 237 }}
      // whileHover={{ width: 355 }}
      // transition={{ type: "keyframes" }} // Smooth transition
    >
      <img
        src={img}
        alt="Card image"
        className={clsx(
          "rounded-md ",
          hover
            ? "absolute top-0 left-0 right-0 bottom-0 object-cover"
            : " w-full h-auto ",
        )}
      />
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" relative flex flex-col justify-end h-full text-white  p-6 pb-7  "
          >
            <div className="min-h-[33%] absolute top-[60%] z-20 font-bold flex gap-5 flex-col  items-start ">
              <span className="px-3 py-0  border border-white rounded-xl  w-fit">
                {date}
              </span>
              <p className="">{text}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-[45%] bg-gradient-to-t from-black/80 to-black/5 bg-opacity-60 z-10" />
          </motion.div>
        )}
        {!hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3"
          >
            <span className="block text-gray-600">{date}</span>
            <p className="mt-2 text-gray-800">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const partners = [
  { name: "ABAI IT VALLEY", img: "/aiv.png" },
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
];

const Partners = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Container className="flex items-center flex-col ">
      <Heading className="text-center mb-[37px]">Партнерство</Heading>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        //@ts-ignore
        plugins={[plugin.current]}
        className="mb-10 md:mb-0"
      >
        <CarouselContent className="-ml-10 max-w-[20rem] sm:max-w-sm  md:max-w-lg lg:max-w-2xl 2xl:max-w-5xl 4xl:max-w-[70rem] ">
          {partners.map((p) => (
            <CarouselItem
              key={p.img}
              className=" flex items-center justify-center pl-10 basis-[100%] md:basis-1/2  lg:basis-1/3 xl:basis-1/4  2xl:basis-1/5"
            >
              <div className="w-[164px] h-[164px] p-4 flex  gap-1 flex-col items-center justify-center rounded-md border-2 border-abu_primary">
                <img src={`/icons${p.img}`} className="" />
                <span className="text-center ">{p.name}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={"default"}>a</CarouselPrevious>
        <CarouselNext variant={"default"}>a</CarouselNext>
      </Carousel>
    </Container>
  );
};
const socials = ["/vk.png", "inst.png", "fb.png", "yt.png", "in.png"];
const Accreditation = () => {
  const locale = useParams().locale;
  return (
    <Container className="px-2 md:px-0">
      <div className="flex gap-5 items-center justify-between">
        <Heading>
          Аккредитация <br /> и признание
        </Heading>
        <img src="/icons/accre.png" className="w-[166px] h-[69px]" />
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
      <Script id="map-script" src="/map.js" />
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
const getMap = ({ locale }: { locale: string }) => {
  if (locale == "ru" || locale == "kz") {
    return <TwoGisMap />;
  }
  return (
    <iframe
      className="w-full h-full rounded-md"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.7918338912605!2d80.23955609127222!3d50.40771698426139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f2653d0aaf6d87%3A0xa0f11e2864d6eb80!2zQWxpa2hhbiBCb2tlaWtoYW4gVW5pdmVyc2l0eSAyINC60L7RgNC_0YPRgQ!5e0!3m2!1sru!2skz!4v1730369385166!5m2!1sru!2skz"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
