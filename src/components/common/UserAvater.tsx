import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  className?: string;
  name: string;
}

const UserAvater: React.FC<Props> = ({ src, className, name }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} className="object-cover"/>
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{name.slice(0,2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvater;