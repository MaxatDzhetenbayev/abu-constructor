"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { backendImageUrl } from "@/shared/lib/constants";

export const CardHoverAnimation = ({
  content,
  locale,
}: {
  content: any;
  size: string;
  locale: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(250);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  const { title, content: description } = content[locale];

  const imageVariants = {
    hover: {
      scale: 0.8,
    },
    initial: {
      scale: 1,
    },
  };

  const cardVariant = {
    hover: {
      y: -contentHeight + 20,
      height: "auto",
    },
    initial: {
      height: "250px",
    },
  };

  return (
    <article
      className={
        "h-[300px] bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.38)] rounded-lg p-6 cursor-pointer"
      }
    >
      <motion.div
        className="overflow-hidden"
        transition={{
          duration: 0.3,
        }}
        whileHover="hover"
        variants={cardVariant}
        initial="initial"
      >
        <motion.div
          transition={{
            duration: 0.3,
          }}
          variants={imageVariants}
          className="w-full h-[200px] relative rounded-lg overflow-hidden"
        >
          <Image
            src={`${backendImageUrl}${content.image}`}
            fill
            objectFit="cover"
            alt="image"
          />
        </motion.div>
        <motion.h2 className="text-calc-text-2xl font-bold text-center mt-3">
          {title}
        </motion.h2>
        <motion.div
          ref={contentRef}
          className="text-justify quill-content"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.div>
    </article>
  );
};
