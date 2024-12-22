import clsx from "clsx";
import { ReactNode } from "react";

interface ListItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}
export const ListItem = ({ children, icon, href }: ListItemProps) => {
  return (
    <li className="bg-abu_primary w-full text-left p-4 rounded-xl text-white flex justify-between align-middle">
      <a
        target="_blank"
        href={href}
        className={clsx(icon && "flex gap-2 w-full items-center text-calc-md")}
      >
        <span>{icon}</span> {children}
      </a>
    </li>
  );
};
