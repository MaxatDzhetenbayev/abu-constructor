import React from "react";
import { ICardLinkListProps } from "./Interfaces";
import { CardLink } from "./CardLink";
export const CardLinks = ({ items, title }: ICardLinkListProps) => {
  return (
    <section className="">
      {title && <h2>{title}</h2>}
      <ul className="flex ">
        {items.map((item, idx) => (
          <CardLink key={idx} {...item} />
        ))}
      </ul>
    </section>
  );
};
