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
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Script from "next/script";
import { ReactNode, useEffect, useRef, useState } from "react";

import "../../globals.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import Link from "next/link";
import { President } from "@/widgets";
import { HomeCoverFlowGallery } from "@/widgets/common/HomeCoverFlowGallery/HomeCoverFlowGallery";
import { useTranslations } from "next-intl";

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

export default function Page({ params }: any) {
  const { locale } = params;
  const [scrolled] = useScroll(40);
  return (
    <>
      {/* Hero section */}
      <section
        className={clsx(
          `w-full h-[100vh] [@media(min-width:890px)]:relative `,
          scrolled ? "top-0" : "-top-[96px]"
        )}
      >
        {/* На доработке */}
        {/* <AppealDialog /> */}
        {/* //На доработке */}

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
        <President />
        <HomeCoverFlowGallery locale={locale} />
        <News />
        <IELTS />
        <Partners />
        <Accreditation />
      </section>
    </>
  );
}
const SectionOne = () => {
  const t = useTranslations("home");

  return (
    <Container>
      <Heading className="mt-10 md:mt-0">{t("infographics.title")}</Heading>
      <section className="flex justify-center flex-wrap xl:flex-nowrap gap-2   md:gap-5  rounded-md ">
        {Array.from({ length: 5 })
          .fill(1)
          .map((s, idx) => (
            <section
              key={idx}
              className="flex items-center relative h-[5.75rem] md:h-[10.75rem] rounded-md px-2.5 w-[17.875rem] bg-abu_primary "
            >
              <span className="text-white font-bold text-calc-xl">
                {t(`infographics.${idx + 1}`)}
              </span>
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

const Rector = ({ close }: { close?: ReactNode }) => {
  return (
    <Container className="relative rounded-xl md:rounded-3xl w-full max-h-[100svh] md:max-h-[54rem]  md:max-w-[70.875rem]   bg-abu_primary  mb-3 px-0 md:px-3">
      {close}
      <section className="px-0 py-12 lg:p-[4.3rem]">
        <Heading className="text-white text-center md:text-left">
          Обращение
        </Heading>
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 gap-y-4 lg:gap-4 ">
          <div className="flex flex-col gap-3 lg:gap-8">
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
        "text-calc-2xl max-lg:text-center pl-3 md:pl-0 font-bold mb-4 md:mb-8 text-[#640000]",
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
    <article
      className={clsx(
        "py-4 px-5 grow basis-1 border flex flex-col gap-[.9rem] border-slate-200 rounded-md",
        className
      )}
    >
      <div className="relative  aspect-square md:max-h-[380px] lg:max-h-[320px]">
        <Image src={img} fill alt={text} className="object-cover" />
      </div>
      <div className="">
        <h2 className="text-abu_primary font-semibold text-calc-xl">{text}</h2>
        <p className="text-[#3E3232] text-calc-md mt-3">{desc}</p>
      </div>
    </article>
  );
};
const MoreButton = ({
  maxWidth,
  link,
}: {
  maxWidth?: string;
  link: string;
}) => {
  const t = useTranslations();

  return (
    <Link
      href={`${link}`}
      className="flex py-3 w-full justify-center items-center rounded-lg bg-abu_primary gap-2"
      style={{
        maxWidth,
      }}
    >
      <span className="text-2xl text-white font-bold">{t("more")}</span>
      <ArrowRight color="white" />
    </Link>
  );
};

// const Events = () => {
//   return (
//     <section className="flex flex-col justify-between gap-3  text-white  max-h-[35rem] ">
//       <section className="bg-abu_primary h-[85%] overflow-y-auto flex flex-col gap-3 py-5 px-6 rounded-md">
//         <div className="flex gap-2 ">
//           <Image
//             alt="event icon"
//             src={"/icons/events.svg"}
//             width={39}
//             height={39}
//           />
//           <h3 className=" text-xl  lg:text-3xl  font-bold  ">Ивенты</h3>
//         </div>
//         {events.map((ev) => (
//           <div key={ev.date} className="flex gap-3 ">
//             <div className="w-[6.25rem] h-[5.313rem] px-3 rounded-md bg-[#FFCC00] flex items-center justify-center flex-col text-white font-bold">
//               <span className="text-2xl font-bold">{ev.label.n}</span>
//               <span className="text-md">{ev.label.l}</span>
//             </div>
//             <div className="flex flex-col gap-2">
//               <h3 className="text-xl w-full text-wrap lg:text-nowrap font-bold">
//                 {ev.title}
//               </h3>
//               <p className="text-md">{ev.text}</p>
//             </div>
//           </div>
//         ))}
//       </section>
//       <AllButton />
//     </section>
//   );
// };

const News = () => {
  const t = useTranslations("home");

  return (
    <Container className="w-full ">
      <Heading>{t("news.title")}</Heading>
      <section className="w-full flex flex-col gap-4">
        {/* <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-5">
          <Card key={news[0].desc} {...news[0]} />
          <Events />
        </section> */}
        <section className="flex gap-4 max-lg:flex-col">
          {news.slice(0, 3).map((card) => (
            <Card key={card.text} {...card} />
          ))}
        </section>
        <MoreButton maxWidth="506px" link="news" />
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
  const t = useTranslations("home.partners");

  return (
    <section className="bg-abu_primary py-20">
      <Container className="grid place-items-center   ">
        <Heading className="text-center font-bold   mb-[37px] text-white">
          {t("title")}
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

  const t = useTranslations("home");

  return (
    <Container className="px-2 md:px-0">
      <div className="flex gap-5 items-center mb-[3.938rem] justify-center md:justify-end">
        <Heading className="md:mb-0">
          {t("accreditation&Recognition.title")}
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
            <h3 className="text-4xl font-bold">{t("contacts.our")}</h3>
            <a href="tel:+77222423224">+7 (7222) 42-32-24</a>
            <a href="mailto:semey@abu.edu.kz">semey@abu.edu.kz</a>
            <h3 className="text-4xl font-bold">{t("contacts.admissions")}</h3>
            <a href="tel:+77222423224">+7 (7222) 44-24-56</a>
            <a href="tel:+77222423224">+7 (700) 643 43 56</a>
          </div>
          <div className="bg-abu_primary rounded-md text-white p-10 min-h-[216px]">
            <h3 className="text-4xl mb-[35px] font-bold">
              {t("contacts.social")}
            </h3>
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
        className={`pl-16  pr-3 lg:py-6 py-4 text-md w-full border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
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
        className={`pl-16  pr-3 lg:py-6  py-4 text-md w-full border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
        {...textareaProps}
      />
    </div>
  );
};
