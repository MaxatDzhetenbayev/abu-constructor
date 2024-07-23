import React from "react";
import { ICardLinkProps } from "./Interfaces";
import Link from "next/link";

export const CardLink = ({ href, image, title }: ICardLinkProps) => {
  return (
    <li
      className={`bg-[url(http://77.243.80.138:81/media/${image})] flex-grow flex-shrink h-[200px] bg-cover bg-center`}
    >
      <Link href={href}>{title}</Link>
    </li>
  );
};
