import React from 'react'

import { cn } from "@/lib/utils";
import { Link, useSearchParams } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const [searchParams,setSearchParams] = useSearchParams();

  const tab = searchParams.get('tab');

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.href}
          onClick={()=>setSearchParams({tab: item.href})}
          className={cn("cursor-pointer select-none w-full",
            buttonVariants({ variant: "ghost" }),
            tab === item.href
              ? "dark:bg-[#292932] borderWrapper "
              : "hover:dark:bg-[#292932] hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
}

export default SidebarNav