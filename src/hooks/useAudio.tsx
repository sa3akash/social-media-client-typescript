import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

// Custom hook for using the AudioContext
const useAudio = (url: string) => {
  const waveSurferRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!waveSurferRef.current) return;
    if(!url) return;

    const ws = WaveSurfer.create({
      container: waveSurferRef.current,
      waveColor:"#E2E2EA",
      progressColor: "#DC0083",
      url: url,
      height: 50,
      renderFunction: (channels, ctx) => {
        // Customize rendering as required
        const { width, height } = ctx.canvas;
        const scale = channels[0].length / width;
        const step = 6;

        ctx.translate(0, height / 2);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();

        for (let i = 0; i < width; i += step * 2) {
          const index = Math.floor(i * scale);
          const value = Math.abs(channels[0][index]);
          let x = i;
          let y = value * height;

          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);
          ctx.lineTo(x + step, 0);

          x = x + step;
          y = -y;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, y);
          ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);
          ctx.lineTo(x + step, 0);
        }

        ctx.stroke();
        ctx.closePath();
      },
    });

    ws.on("ready", () => {
      const dur = ws.getDuration();
      setDuration(dur);
    });

    ws.on("audioprocess", () => {
      const current = ws.getCurrentTime();  
      setCurrentTime(current);  
    });

    ws.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
      setWavesurfer(null);
    };
  }, [url]);

  const togglePlayPause = () => {
    if (!wavesurfer) return;
    if (wavesurfer.isPlaying()) {
      wavesurfer.pause();
      setIsPlaying(false);
    } else {
      wavesurfer.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    waveSurferRef,
    wavesurfer,
    isPlaying,
    currentTime: formatTime(currentTime),
    duration: formatTime(duration),
    previewDuration: formatTime(duration - currentTime),
    togglePlayPause,
  };
};

export default useAudio;
