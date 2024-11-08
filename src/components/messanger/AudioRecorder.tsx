import useAudio from "@/hooks/useAudio";
import useVoiceMessage from "@/hooks/useVoiceMessage";
import { Disc2, Mic, Pause, Play, Trash, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  setIsAudioRecord: React.Dispatch<React.SetStateAction<boolean>>;
  setVoiceAudio: React.Dispatch<React.SetStateAction<File | null>>;
}

const AudioRecorder:FC<Props> = ({setIsAudioRecord,setVoiceAudio}) => {
  const [url, setUrl] = useState("");

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording,
    audioFile,
    resetAudioRecorder,
  } = useVoiceMessage();

  const { previewDuration, waveSurferRef, isPlaying, togglePlayPause } =
    useAudio(url);

  useEffect(() => {
    if (!audioFile) return;
    setUrl(URL.createObjectURL(audioFile));
    setVoiceAudio(audioFile)
  }, [audioFile, setVoiceAudio]);

  return (
    <>
    <div className="flex-1 cardBG h-full rounded-md flex items-center gap-1 justify-center">
      {audioFile ? (
        <>
          <button onClick={togglePlayPause} className="min-w-[32px] px-2" title={isPlaying ? "Audio Pause" : "Audio Play"}>
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <div className="w-full cursor-pointer" ref={waveSurferRef} />
          <div className="min-w-[80px] flex items-center justify-end gap-2 pr-2">
            <span className="text-xs">{previewDuration}</span>
            <button onClick={resetAudioRecorder} title="Audio Delete">
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4 justify-center">
          <Button variant="ghost"
            onClick={isRecording ? stopRecording : startRecording}
            className="min-w-[32px] px-2"
            title={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? (
              <Disc2 className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>
        </div>
      )}

      {isRecording && (
        <p className=" text-center text-red-500 animate-pulse">
          Recording... {recordingTime}
        </p>
      )}
      
    </div>
    <button className="px-2" onClick={()=>setIsAudioRecord(false)}>
        <X />
      </button>
    </>
  );
};

export default AudioRecorder;
