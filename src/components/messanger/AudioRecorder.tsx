import useAudio from "@/hooks/useAudio";
import useVoiceMessage from "@/hooks/useVoiceMessage";
import { Disc2, Mic, Pause, Play, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const AudioRecorder = () => {
  const [url, setUrl] = useState("");

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    audioBlob,
  } = useVoiceMessage();

  const { previewDuration, waveSurferRef, isPlaying, togglePlayPause } =
    useAudio(url);

  useEffect(() => {
    if (!audioBlob) return;
    setUrl(URL.createObjectURL(audioBlob));
  }, [audioBlob]);

  return (
    <div className="flex-1 cardBG h-full rounded-md flex items-center gap-2">
        {audioBlob ? (
          <button onClick={togglePlayPause} className="min-w-[32px] px-2">
          {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
        </button>
      ) : 
      <button onClick={isRecording ? stopRecording : startRecording} className="min-w-[32px] px-2">
          {isRecording ? <Disc2 className="w-5 h-5"/> : <Mic className="w-5 h-5"/>}
        </button>
        }

        {isRecording && <p className="w-full text-center text-red-500">Recording Time: {recordingTime}</p>}

        {/* Display waveform */}
        <div className="w-full cursor-pointer" ref={waveSurferRef} />
        
        {audioBlob && (
          <div className="min-w-[80px] flex items-center gap-1 px-2">
            <span className="text-xs">{previewDuration}</span>
            <button><Trash className="w-5 h-5"/></button>
          </div>
        )}
   
    </div>
  );
};

export default AudioRecorder;
