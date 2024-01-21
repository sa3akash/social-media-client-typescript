import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  text: string;
  active: boolean;
  className?: string;
  fn?: () => void;
}

export const FollowButton: React.FC<Props> = ({
  active,
  text,
  className,
  fn,
}) => {
  return (
    <button
      className={cn(
        "px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all bg-gray-500 hover:bg-gray-500 border-gray-500",
        active
          ? "bg-[#1E75FF] hover:bg-[#1e80ff] border-[#1E75FF]"
          : "bg-transparent",
        className
      )}
      onClick={fn}
    >
      {text}
    </button>
  );
};
