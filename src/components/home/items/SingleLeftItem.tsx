import { LeftSidebarDoc } from "@/data/SidebarLeftData";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  item: LeftSidebarDoc;
  pathname: string;
}

export const SingleLeftItem: React.FC<Props> = ({ item, pathname }) => {
  const active = pathname === item.link;
  return (
    <Link
      to={item.link}
      className={cn(
        "flex items-center w-full justify-center lg:justify-start h-12 md:h-14 pl-0 lg:pl-6 md:gap-3 relative cursor-pointer select-none",
        active && "bg-muted md:bg-transparent rounded-md"
      )}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className={cn(
          "",
          active && "filter brightness-50 dark:brightness-150 "
        )}
      />
      <h3
        className={cn(
          "text-primary/60 transition-all hidden lg:block",
          active && "text-primary"
        )}
      >
        {item.name}
      </h3>
      {active ? (
        <div className="hidden md:block bg-[#1C1C24] dark:bg-white rounded-md w-1 h-[80%] absolute left-[-1px] " />
      ) : null}
    </Link>
  );
};
