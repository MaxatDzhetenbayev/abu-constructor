"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import { backendImageUrl } from "@/shared/lib/constants";
import { Modal, MoreArrow } from "@/shared/ui";

export const ProfileCard = ({
  locale,
  content,
}: {
  locale: string;
  content: any;
}) => {
  const { job_title, full_name, description: body } = content[locale];

  const filePath = content?.image?.[locale] || content?.image?.ru;

  return (
    <Modal modalSlot={body}>
      <section className="flex px-5 cursor-pointer  flex-col  gap-2 shadow-[0_0_30px_0px_rgba(0,0,0,0.05)] rounded-2xl bg-white mt-4 ">
        <section className="relative max-w-[400px] w-full h-[363px] sm:mx-auto">
          <Image
            src={`${backendImageUrl}${filePath}`}
            fill
            priority
            objectFit="cover"
            alt="image"
            className="rounded-2xl"
          />
        </section>
        <section className="flex flex-1 py-5 flex-col  ">
          <div>
            <p className="text-font_primary font-bold text-calc-md">
              {job_title}
            </p>
            <h2 className="font-bold text-calc-xl">{full_name}</h2>
          </div>
          <div className="flex items-center gap-5 mt-[15px]">
            <p className="group-hover:text-white">Подробнее</p>
            <MoreArrow size={17} />
          </div>
        </section>
      </section>
    </Modal>
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const contentVariants: Variants = {
    hidden: {
      height: "auto",
      transition: {
        delay: 0.3,
      },
    },
    visible: {
      height: "100%",
      backdropFilter: "blur(2px)",
    },
  };

  const paragraphVariants: Variants = {
    hidden: {
      x: -300,
      height: 0,
      opacity: 0,
      transition: {
        x: { type: "spring", damping: 25 },
        height: { delay: 0.3 },
        opacity: { duration: 0.5 },
      },
    },
    visible: {
      x: 0,
      height: "auto",
      opacity: 1,
      transition: {
        x: { type: "spring", damping: 25 },
        opacity: { delay: 0.2, duration: 0.5 },
      },
    },
  };

  return (
    <li
      className="h-[400px] bg-cover bg-center bg-no-repeat rounded-3xl cursor-pointer flex flex-col justify-end overflow-hidden"
      style={{
        backgroundImage: `url(${backendImageUrl + content?.image})`,
      }}
      onMouseEnter={toggleOpen}
      onMouseLeave={toggleOpen}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="bg-gradient-to-b to-black from-transparent text-white p-5"
      >
        <motion.div
          className="h-[100%] flex flex-col justify-end"
          variants={{
            hidden: { gap: "0px" },
            visible: {
              gap: "10px",
            },
          }}
        >
          <h3>{content?.[locale]?.full_name}</h3>
          <p>{content?.[locale]?.job_title}</p>
          <motion.p
            variants={paragraphVariants}
            className="quill-content"
            style={{ overflow: "hidden" }}
            dangerouslySetInnerHTML={{ __html: content?.[locale]?.description }}
          />
        </motion.div>
      </motion.div>
    </li>
  );
};
