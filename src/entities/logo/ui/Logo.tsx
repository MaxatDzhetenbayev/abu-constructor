import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

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
        return { width: "400px" };
      default:
        return { width: "280px" };
    }
  };

  return (
    <Link
      href="/"
      className={clsx(
        "flex gap-3",
        isMobileView && "[@media(min-width:890px)]:hidden"
      )}
      style={{
        position: "relative",
        height: "80px",
        width: addLogoSize(size).width,
      }}
    >
      <Image
        src={`/enbek/enbek.png`}
        alt="logo"
        width={70}
        height={70}
        priority
        style={{ objectFit: "contain" }}
      />
      <Image
        src={`/enbek/oblysy.png`}
        alt="logo"
        width={140}
        height={90}
        priority
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
};
