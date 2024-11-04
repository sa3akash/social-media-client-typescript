import { Pause, Play } from "lucide-react";
import useAudio from "@/hooks/useAudio";

const AudioMessage = ({ url }: { url: string }) => {
  const { waveSurferRef, isPlaying, togglePlayPause, previewDuration } =
    useAudio(url);

  return (
    <div className="flex items-center gap-2 p-2">
      <button onClick={togglePlayPause} className="w-8 px-2">
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
        className="w-[200px] md:w-[300px] 2xl:w-[400px]"
      ></div>
      <span className="text-xs w-9">{previewDuration}</span>
    </div>
  );
};

export default AudioMessage;
