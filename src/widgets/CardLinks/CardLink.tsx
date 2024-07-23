import React from "react";
import { ICardLinkProps } from "./Interfaces";
import Link from "next/link";

export const CardLink = ({ HRef, image, Title }: ICardLinkProps) => {
  return (
    <li
      className={`flex-grow flex-shrink h-[200px] bg-cover bg-center`}
      style={{ backgroundImage: `url(http://77.243.80.138:81/media/${image})` }}
    >
      <Link href={'/' + HRef}>{Title}</Link>
    </li>
  );
};
