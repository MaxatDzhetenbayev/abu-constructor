"use client"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { LogoSize } from "../model";

interface LogoProps {
  size?: LogoSize;
  isMobileView?: boolean;
}

export const Logo = ({
  size = LogoSize.MEDIUM,
  isMobileView = false,
}: LogoProps) => {
  const addLogoSize = (size: LogoSize) => {
    switch (size) {
      case LogoSize.SMALL:
        return { width: "180px" };
      case LogoSize.MEDIUM:
        return { width: "280px" };
      default:
        return { width: "280px" };
    }
  };

  const locale = useParams().locale as string;

  return (
    <Link
      href={`/${locale}/home`}
      className={clsx(
        "inline",
        isMobileView && "[@media(min-width:890px)]:hidden"
      )}
      style={{
        position: "relative",
        height: "80px",
        width: addLogoSize(size).width,
      }}
    >
      <Image
        src={`/images/logo-white.png`}
        alt="logo"
        fill
        priority
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
};
