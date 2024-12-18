import React from "react";
import clsx from "clsx";
import { useScroll } from "@/shared/lib/hooks/useScroll";

export const Banner = () => {
  const [scrolled] = useScroll(40);

  return (
    <section
      className={clsx(
        `w-full h-[100vh] [@media(min-width:890px)]:relative `,
        scrolled ? "top-0" : "-top-[96px]"
      )}
    >
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
  );
};
