import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface ListItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}
export const ListItem = ({ children, icon, href }: ListItemProps) => {
  return (
    <li className="items-center rounded-[10px] hover:underline  justify-start pl-5 font-bold cursor-pointer min-h-[90px]  flex shadow-[0px_4px_23.5px_4px_rgba(0,0,0,0.11)]  bg-gray-50">
      <Link
        target="_blank"
        href={'/'}
        className={cn(icon && "flex gap-2 w-full hover:decoration-solid")}
      >
        {icon}
        <p>
          {children}
        </p>
      </Link>
    </li>
  );
};
