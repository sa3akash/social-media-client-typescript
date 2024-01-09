import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  label: string;
  children: React.ReactNode;
  content?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
}

const ActionTolltip: FC<Props> = ({
  label,
  children,
  side,
  align,
  content,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">{label}</p>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTolltip;
