import { cn } from "@/lib/utils";
import millify from "millify";
import React from "react";

interface Props {
  text: string;
  count: number;
  active: boolean;
}

const SinglePostInfo: React.FC<Props> = ({ active, count, text }) => {
  return (
    <div className="flex flex-col px-2 py-4 h-full justify-end items-center xl:justify-between select-none cursor-pointer relative z-10 ">
      <span
        className={cn(
          "text-[14px] tracking-[0.2px] text-[#92929D]",
          active && "text-[#1E75FF]"
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "font-semibold text-[15px] tracking-[0.1px]",
          active && "text-[#1E75FF]"
        )}
      >
        {millify(count)}
      </span>

      {active && (
        <div className="bg-[#1E75FF] h-[6px] w-full absolute -bottom-[2px] left-0 rounded-full" />
      )}
    </div>
  );
};

export default SinglePostInfo;
