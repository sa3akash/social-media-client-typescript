
// import React, { useEffect, useRef, useState } from "react";  
// import WaveSurfer from "wavesurfer.js";  

// const WebformAudio = ({url}:{url:string}) => {  
//   const weveformRef = useRef<HTMLDivElement | null>(null);  
//   const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);  
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);  
//   const [currentTime, setCurrentTime] = useState<string>("00:00");  
//   const [duration, setDuration] = useState<string>("00:00");  // Use string for duration as well  

//   useEffect(() => {  
//     if (!weveformRef.current) return;  
    
//     const wavesurfer = WaveSurfer.create({  
//       container: weveformRef.current,  
//       waveColor: "#3C50E0",  
//       progressColor: "#80CAEE",  
//       url: url,
//       height: 80,
      
//       renderFunction: (channels, ctx) => {  
//         // Customize rendering as required  
//         const { width, height } = ctx.canvas;  
//         const scale = channels[0].length / width;  
//         const step = 6;  

//         ctx.translate(0, height / 2);  
//         ctx.strokeStyle = ctx.fillStyle;  
//         ctx.beginPath();  

//         for (let i = 0; i < width; i += step * 2) {  
//           const index = Math.floor(i * scale);  
//           const value = Math.abs(channels[0][index]);  
//           let x = i;  
//           let y = value * height;  

//           ctx.moveTo(x, 0);  
//           ctx.lineTo(x, y);  
//           ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);  
//           ctx.lineTo(x + step, 0);  

//           x = x + step;  
//           y = -y;  
//           ctx.moveTo(x, 0);  
//           ctx.lineTo(x, y);  
//           ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);  
//           ctx.lineTo(x + step, 0);  
//         }  

//         ctx.stroke();  
//         ctx.closePath();  
//       },  
//     });  

//     wavesurfer.on("ready", () => {  
//       const dur = wavesurfer.getDuration();  
//       setDuration(formatTime(dur));  // Format duration to MM:SS  
//     });  
    
//     wavesurfer.on('audioprocess', () => {  
//       setCurrentTime(formatTime(wavesurfer.getCurrentTime()));  // Update current time  
//     });  

//     wavesurfer.on('finish', () => {  
//       setIsPlaying(false);  
//       setCurrentTime(formatTime(0));  // Reset current time to 00:00  
//     });  

//     setWavesurfer(wavesurfer);  

//     // Run cleanup to destroy wavesurfer on component unmount  
//     return () => {  
//       wavesurfer.destroy();  
//       setWavesurfer(null);  
//     };  
//   }, [url]);  

//   const formatTime = (time: number) => {  
//     const minutes = Math.floor(time / 60);  
//     const seconds = Math.floor(time % 60);  
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;  
//   };  

//   const handlePlayPause = () => {  
//     if (!wavesurfer) return;  
//     if (isPlaying) {  
//       wavesurfer.pause();  
//     } else {  
//       wavesurfer.play();  
//     }  
//     setIsPlaying((prev) => !prev);  
//   };  

//   return (  
//     <div className="min-w-[500px]">  
//       <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>  
//       <span>{currentTime}/{duration}</span>  

//       <div>  
//         <div style={{
//             cursor: "pointer",
//             overflow: "hidden"
//         }} ref={weveformRef} ></div>  
//       </div>  
//     </div>  
//   );  
// };  

// export default WebformAudio;


// ==================================================



// import React, { useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";

// const WebformAudio = ({ url }: { url: string }) => {
//   const weveformRef = useRef<HTMLDivElement | null>(null);
//   const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [currentTime, setCurrentTime] = useState<number>(0); // Store as number for calculations
//   const [duration, setDuration] = useState<number>(0); // Store as number for calculations

//   useEffect(() => {
//     if (!weveformRef.current) return;

//     const wavesurfer = WaveSurfer.create({
//       container: weveformRef.current,
//       waveColor: "#3C50E0",
//       progressColor: "#80CAEE",
//       url: url,
//       height: 50
//     });

//     wavesurfer.on("ready", () => {
//       const dur = wavesurfer.getDuration();
//       setDuration(dur); // Store duration as a number
//     });

//     wavesurfer.on("audioprocess", () => {
//       const current = wavesurfer.getCurrentTime();
//       setCurrentTime(current); // Update current time as a number
//     });

//     wavesurfer.on("finish", () => {
//       setIsPlaying(false);
//       setCurrentTime(0); // Reset current time to 0 when finished
//     });

//     setWavesurfer(wavesurfer);

//     // Cleanup to destroy wavesurfer on component unmount
//     return () => {
//       wavesurfer.destroy();
//       setWavesurfer(null);
//     };
//   }, [url]);

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handlePlayPause = () => {
//     if (!wavesurfer) return;
//     if (isPlaying) {
//       wavesurfer.pause();
//     } else {
//       wavesurfer.play();
//     }
//     setIsPlaying((prev) => !prev);
//   };

//   // Calculate remaining time
//   const remainingTime = duration - currentTime;

//   return (
//     <div className="min-w-[500px]">
//       <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
//       <span>{formatTime(remainingTime)}/{formatTime(duration)}</span> {/* Display remaining time and total duration */}

//       <div>
//         <div style={{
//           cursor: "pointer",
//           overflow: "hidden",
//         }} ref={weveformRef}></div>
//       </div>
//     </div>
//   );
// };

// export default WebformAudio;











// ==================================


import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const WebformAudio = ({ url }: { url: string }) => {
  const weveformRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0); // Store as number for calculations
  const [duration, setDuration] = useState<number>(0); // Store as number for calculations

  useEffect(() => {
    if (!weveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: weveformRef.current,
      waveColor: "#233bf3",
      progressColor: "#30a3dc",
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

    wavesurfer.on("ready", () => {
      const dur = wavesurfer.getDuration();
      setDuration(dur); // Store duration as a number
    });

    wavesurfer.on("audioprocess", () => {
      const current = wavesurfer.getCurrentTime();
      setCurrentTime(current); // Update current time as a number
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0); // Reset current time to 0 when finished
    });

    setWavesurfer(wavesurfer);

    // Cleanup to destroy wavesurfer on component unmount
    return () => {
      wavesurfer.destroy();
      setWavesurfer(null);
    };
  }, [url]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!wavesurfer) return;
  
    if (isPlaying) {
      wavesurfer.pause();
      setIsPlaying(false); // Explicitly set to false on pause
    } else {
      wavesurfer.play();
      setIsPlaying(true); // Explicitly set to true on play
    }
  };

 

  return (
    <div className="flex items-center gap-2 p-2">
      <button onClick={handlePlayPause} className="w-8 px-2">
        {isPlaying ? (<Pause className="w-5 h-5" />) : (<Play className="w-5 h-5"/>)}
        </button>

        <div style={{
          cursor: "pointer",
          overflow: "hidden",
        }} ref={weveformRef} className="w-[200px] md:w-[300px] 2xl:w-[400px]"></div>
    
        <span className="text-xs w-9">{formatTime(duration - currentTime)}</span> {/* Display remaining time and total duration */}
    </div>
  );
};

export default WebformAudio;
