import { Pause, Play } from "lucide-react";
import useAudio from "@/hooks/useAudio";
import { cn } from "@/lib/utils";

const AudioMessage = ({ url,wonMessage }: { url: string,wonMessage:boolean }) => {
  const { waveSurferRef, isPlaying, togglePlayPause, previewDuration } =
    useAudio(url);

  return (
    <div className={cn("flex items-center gap-1 p-2 rounded-lg",
      wonMessage ? 'bg-[#0084ff]' : 'bg-[#292932]'
    )}>
      <button onClick={togglePlayPause} className="min-w-[32px] px-2">
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <div
        style={{
          cursor: "pointer",
          overflow: "hidden",
        }}
        ref={waveSurferRef}
        // className="w-[200px] md:w-[300px] 2xl:w-[400px]"
        className="w-full"
      ></div>
      <span className="text-xs min-w-[40px]">{previewDuration}</span>
    </div>
  );
};

export default AudioMessage;
