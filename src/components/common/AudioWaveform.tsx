// import React, { useRef, useEffect } from "react";
// import WaveSurfer from "wavesurfer.js";

// interface AudioWaveformProps {
//   audioUrl: string;
// }

// const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl }) => {
//   const waveformRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (waveformRef.current) {
//       const wavesurfer = WaveSurfer.create({
//         container: waveformRef.current,
//         waveColor: "violet",
//         progressColor: "purple",
//         cursorColor: "navy",
//         barWidth: 3,
//         barHeight: 1,
//       });

//       wavesurfer.load(audioUrl);

//       return () => {
//         wavesurfer.destroy();
//       };
//     }
//   }, [audioUrl]);

//   return <div ref={waveformRef} />;
// };

// export default AudioWaveform;

// import React, { useRef, useState, useEffect } from "react";
// import WaveSurfer from "wavesurfer.js";

// interface AudioFormProps {
//   audioUrl: string;
// }

// const AudioForm: React.FC<AudioFormProps> = ({ audioUrl }) => {
//   const wavesurferRef = useRef<WaveSurfer | null>(null);
//   const waveformRef = useRef<HTMLDivElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     if (audioUrl) {
//       if (wavesurferRef.current) {
//         wavesurferRef.current.stop();
//         setIsPlaying(false);
//       }
//       const wavesurfer = WaveSurfer.create({
//         container: waveformRef.current!,
//         waveColor: "violet",
//         progressColor: "purple",
//         cursorColor: "navy",
//       });
//       wavesurfer.load(audioUrl);

//       wavesurfer.on("ready", () => {
//         wavesurferRef.current = wavesurfer;
//       });
//       wavesurfer.on("click", () => {
//         if (wavesurferRef.current) {
//           wavesurferRef.current.play();
//           setIsPlaying(true);
//         }
//       });
//     }
//   }, [audioUrl]);

//   const handlePlay = () => {
//     if (wavesurferRef.current) {
//       if (isPlaying) {
//         wavesurferRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         wavesurferRef.current.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   const handleStop = () => {
//     if (wavesurferRef.current) {
//       wavesurferRef.current.stop();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div>
//       <div ref={waveformRef} />
//       <button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };

// export default AudioForm;

// =-=====================

import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface AudioFormProps {
  audioUrl: string;
}

const AudioForm: React.FC<AudioFormProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let wavesurferInstance: WaveSurfer | null = null;

    const options = {
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "navy",
      height: 50,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!wavesurferInstance) {
            wavesurferInstance = WaveSurfer.create({
              container: waveformRef.current!,
              ...options,
            });
            wavesurferInstance.load(audioUrl);
            wavesurferInstance.on("ready", () => {
              setWavesurfer(wavesurferInstance);
            });
            wavesurferInstance.on("interaction", () => {
              if (wavesurferInstance) {
                wavesurferInstance.play();
                setIsPlaying(true);
              }
            });
          }
        } else {
          if (wavesurferInstance) {
            wavesurferInstance.destroy();
            wavesurferInstance = null;
            setWavesurfer(null);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed
    });

    if (waveformRef.current) {
      observer.observe(waveformRef.current);
    }

    return () => {
      if (wavesurferInstance) {
        wavesurferInstance.destroy();
      }
      observer.disconnect();
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (wavesurfer) {
      if (isPlaying) {
        wavesurfer.pause();
        setIsPlaying(false);
      } else {
        wavesurfer.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <div ref={waveformRef} className="bg-[#292932] w-full rounded-2xl"/>
      <button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default AudioForm;
