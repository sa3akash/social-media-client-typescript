import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  imageUrl: string;
  title: string;
}

export const SingleLeftItem: React.FC<Props> = ({ imageUrl, title }) => {
  const pathname = useLocation().pathname.split("/")[1];

  const active = pathname === title;

  return (
    <Link
      to={title}
      className={cn(
        "flex items-center w-full justify-center lg:justify-start h-12 md:h-14 pl-0 lg:pl-6 md:gap-3 relative cursor-pointer select-none",
        active && "bg-muted md:bg-transparent rounded-md"
        // hidden && "hidden md:flex"
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        className={cn(
          "pointer-events-none",
          active && "filter brightness-50 dark:brightness-150"
        )}
      />
      <h3
        className={cn(
          "text-primary/60 transition-all hidden lg:block capitalize",
          active && "text-primary"
        )}
      >
        {title.split('-')[0]} {title.split('-')[1]}
      </h3>
      {active ? (
        <div className="hidden md:block bg-[#1C1C24] dark:bg-white rounded-md w-1 h-[80%] absolute left-[-1px] " />
      ) : null}
    </Link>
  );
};
