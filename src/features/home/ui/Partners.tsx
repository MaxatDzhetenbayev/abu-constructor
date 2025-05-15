import { motion, useMotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

import { Container, Heading } from "@/shared/ui";

export const Partners = () => {
  const t = useTranslations("home.partners");

  return (
    <section className=" py-20">
      <Container className="grid place-items-center   ">
        <Heading className="text-center font-bold mb-[10px] text-abu_primary">
          {t("title")}
        </Heading>
        {/* <PartnersSlider /> */}
        <PartnersCarousel />
      </Container>
    </section>
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

  const circleRef = useRef<HTMLDivElement>(null);
  return (
    <div className=" max-w-[18.75rem] md:max-w-full w-full flex justify-center overflow-hidden">
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
        className=" flex w-full min-h-[14rem] cursor-grab gap-4 active:cursor-grabbing"
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
          >
            <div
              style={{
                backgroundImage: `url(/icons${i.img})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-[40%] h-[40%]" // Ensure both width and height are set
            />
            <h2 className="font-bold text-center text-md md:text-lg lg:text-xl text-abu_primary ">
              {i.name}
            </h2>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
