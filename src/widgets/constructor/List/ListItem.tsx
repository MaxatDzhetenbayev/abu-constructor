"use client"

import clsx from "clsx";
import { ReactNode } from "react";
import { СontentItemEditModal } from './ListClient'
interface ListItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  id: string,
  content: any
  mode: "development" | "production";
}
export const ListItem = ({ children, icon, href, content, id, mode }: ListItemProps) => {
  return (
    <li className="bg-abu_primary w-full text-left p-4 rounded-xl text-white flex justify-between align-middle ">
      <a
        target="_blank"
        href={href}
        className={clsx(icon && "flex gap-2 w-full items-center text-calc-md z-0")}
      >
        <span>{icon}</span> {children}
      </a>
    </li>
  );
};
