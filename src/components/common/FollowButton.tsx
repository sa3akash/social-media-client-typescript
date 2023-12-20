import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  text: string;
  active: boolean;
  className?: string;
}

export const FollowButton: React.FC<Props> = ({ active, text, className }) => {
  return (
    <button
      className={cn(
        "px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all",
        active
          ? "bg-[#1E75FF] hover:bg-[#1e80ff] border-[#1E75FF]"
          : "bg-transparent hover:bg-gray-500 border-gray-500",
        className
      )}
    >
      {text}
    </button>
  );
};
