import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  openCall: string;
}

const CallingAudioVideo: React.FC<Props> = ({ openCall }) => {



  return (
    <div
      className={cn(
        "h-full items-center gap-4 p-4 border-b",
        openCall ? "flex" : "hidden"
      )}
    >
      <div className="flex-1 flex items-center justify-center">
        1   {openCall}     
      </div>
      <div className="flex-1 flex items-center justify-center">2</div>
    </div>
  );
};

export default CallingAudioVideo;
