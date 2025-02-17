// import React, { useEffect, useRef, useState } from "react";  
// import Hls from "hls.js";  
// import {  
//   Play,  
//   Pause,  
//   Volume2,  
//   VolumeX,  
//   Maximize,  
//   Minimize,  
//   Loader,  
// } from "lucide-react";  

// interface VideoPlayerProps {  
//   streamName: string;  
// }  

// const resolutions = [  
//   { label: "1080p", value: "1080p" },  
//   { label: "720p", value: "720p" },  
//   { label: "480p", value: "480p" },  
//   { label: "360p", value: "360p" },  
//   { label: "240p", value: "240p" },  
//   { label: "Auto", value: "auto" },  
// ];  

// const HLSVideoPlayer: React.FC<VideoPlayerProps> = ({ streamName }) => {  
//   const videoRef = useRef<HTMLVideoElement | null>(null);  
//   const hlsRef = useRef<Hls>();  

//   const [isPlaying, setIsPlaying] = useState(false);  
//   const [volume, setVolume] = useState(1);  
//   const [isMuted, setIsMuted] = useState(false);  
//   const [currentTime, setCurrentTime] = useState(0);  
//   const [duration, setDuration] = useState(0);  
//   const [resolution, setResolution] = useState("360p");  
//   const [isFullScreen, setIsFullScreen] = useState(false);  
//   const [isLoading, setIsLoading] = useState(false); // Loading state  
//   const [bufferedPercentage, setBufferedPercentage] = useState(0); // Buffer state  

//   useEffect(() => {  
//     if (!videoRef.current) return;  

//     hlsRef.current = new Hls();  
//     const hls = hlsRef.current;  
//     const hlsUrl =  
//       resolution === "auto"  
//         ? `/live/${streamName}.m3u8`  
//         : `/live/${streamName}_${resolution}/index.m3u8`;  

//     hls.loadSource(hlsUrl);  
//     hls.attachMedia(videoRef.current);  

//     hls.on(Hls.Events.MANIFEST_PARSED, () => {  
//       setDuration(videoRef.current?.duration || 0);  
//     });  

//     // Handle loading and updating buffer percentage  
//     hls.on(Hls.Events.BUFFER_LOADING, () => {  
//       setIsLoading(true);  
//     });  

//     hls.on(Hls.Events.BUFFER_FLUSHING, () => {  
//       setIsLoading(false);  
//     });  

//     hls.on(Hls.Events.BUFFER_APPENDED, () => {  
//       setIsLoading(false);  
//       if (videoRef.current) {  
//         const buffered = videoRef.current.buffered;  
//         if (buffered.length > 0) {  
//           const totalBuffered = buffered.end(buffered.length - 1);  
//           const totalDuration = videoRef.current.duration;  
//           const bufferedPercent = (totalBuffered / totalDuration) * 100;  
//           setBufferedPercentage(bufferedPercent);  
//         }  
//       }  
//     });  

//     return () => {  
//       hls.destroy();  
//     };  
//   }, [streamName, resolution]);  

//   const togglePlay = () => {  
//     if (!videoRef.current) return;  

//     if (isPlaying) {  
//       videoRef.current.pause();  
//     } else {  
//       videoRef.current.play();  
//     }  
//     setIsPlaying(!isPlaying);  
//   };  

//   const toggleMute = () => {  
//     if (!videoRef.current) return;  

//     videoRef.current.muted = !isMuted;  
//     setIsMuted(!isMuted);  
//   };  

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
//     const newVolume = parseFloat(e.target.value);  
//     setVolume(newVolume);  
//     if (videoRef.current) {  
//       videoRef.current.volume = newVolume;  
//       videoRef.current.muted = false;  
//       setIsMuted(false);  
//     }  
//   };  

//   const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
//     if (!videoRef.current || duration === 0) return;  

//     const newTime = (parseFloat(e.target.value) / 100) * duration;  
//     videoRef.current.currentTime = newTime;  
//     setCurrentTime(newTime);  
//   };  

//   const toggleFullScreen = () => {  
//     if (!videoRef.current) return;  

//     if (!isFullScreen) {  
//       videoRef.current.requestFullscreen();  
//     } else {  
//       document.exitFullscreen();  
//     }  
//     setIsFullScreen(!isFullScreen);  
//   };  

//   const handleTimeUpdate = () => {  
//     if (videoRef.current) {  
//       setCurrentTime(videoRef.current.currentTime);  
//     }  
//   };  

//   useEffect(() => {  
//     const handleFullscreenChange = () => {  
//       setIsFullScreen(!!document.fullscreenElement);  
//     };  

//     document.addEventListener("fullscreenchange", handleFullscreenChange);  
//     return () => {  
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);  
//     };  
//   }, []);  

//   const formatTime = (time: number) => {  
//     const minutes = Math.floor(time / 60);  
//     const seconds = Math.floor(time % 60);  
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;  
//   };  

//   return (  
//     <div className="relative bg-black max-w-4xl mx-auto rounded-lg overflow-hidden w-full">  
//       <div className="relative aspect-video bg-black">  
//         <video  
//           ref={videoRef}  
//           className="w-full h-full"  
//           onTimeUpdate={handleTimeUpdate}  
//           onPlay={() => setIsPlaying(true)}  
//           onPause={() => setIsPlaying(false)}  
//           controls={false} // Always disable default controls  
//         />  
//         {/* Loading Spinner */}  
//         {isLoading && (  
//           <div className="absolute inset-0 flex items-center justify-center bg-black/50">  
//             <Loader size={48} className="text-white animate-spin" />  
//           </div>  
//         )}  
//         {/* Controls Overlay */}  
//         <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">  
//           {/* Progress Bar */}  
     

//           {/* Control Buttons */}  
//           <div className="flex items-center justify-between p-4 space-x-4">  
//             {/* Play/Pause */}  
//             <button onClick={togglePlay} className="text-white text-2xl">  
//               {isPlaying ? <Pause size={24} /> : <Play size={24} />}  
//             </button>  

//             {/* Volume */}  
//             <div className="flex items-center space-x-2">  
//               <button onClick={toggleMute} className="text-white">  
//                 {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}  
//               </button>  
//               <input  
//                 type="range"  
//                 min="0"  
//                 max="1"  
//                 step="0.1"  
//                 value={volume}  
//                 onChange={handleVolumeChange}  
//                 className="w-24 accent-red-600"  
//               />  
//             </div>  

//             {/* Resolution Selector */}  
//             <select  
//               value={resolution}  
//               onChange={(e) => setResolution(e.target.value)}  
//               className="bg-gray-900 text-white text-sm border border-gray-700 rounded-md px-2 py-1"  
//             >  
//               {resolutions.map((res) => (  
//                 <option key={res.value} value={res.value}>  
//                   {res.label}  
//                 </option>  
//               ))}  
//             </select>  

//             {/* Fullscreen */}  
//             <button onClick={toggleFullScreen} className="text-white text-xl">  
//               {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}  
//             </button>  
//           </div>  
//         </div>  
//       </div>  
//     </div>  
//   );  
// };  

// export default HLSVideoPlayer;








// =================================


import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  streamName: string; // URL of the HLS stream
}

const resolutions = [
  { label: "1080p", value: "1080p4000kbs" },
  { label: "720p", value: "720p2500kbs" },
  { label: "480p", value: "480p1000kbs" },
  { label: "360p", value: "360p750kbs" },
  { label: "240p", value: "240p200kbs" },
  { label: "auto", value: "auto" },
];

const HLSVideoPlayer: React.FC<VideoPlayerProps> = ({ streamName }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls>();

  useEffect(() => {
    if (!videoRef.current) return;

    hlsRef.current = new Hls();
    const hls = hlsRef.current;
    // const hlsUrl = `/live/${streamName}_360p/index.m3u8`;
    const hlsUrl = `/live/${streamName}_360p750kbs/index.m3u8`;

    // Load the stream
    hls.loadSource(hlsUrl);
    hls.attachMedia(videoRef.current);

    // Play the video
    videoRef.current.play();

    // Play the video when the manifest is parsed
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoRef.current?.play().catch((error) => {
        console.error("Error attempting to play:", error);
      });
    });

    // Cleanup
    return () => {
      hls.destroy();
      if (videoRef.current) {
        videoRef.current = null;
      }
    };
  }, [streamName]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!hlsRef.current) return;

    if (e.target.value === "auto") {
      hlsRef.current.loadSource(`/live/${streamName}.m3u8`);
    } else {
      hlsRef.current.loadSource(
        `/live/${streamName}_${e.target.value}/index.m3u8`
      );
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", height: "auto" }}
        autoPlay
        muted
      />
      <div>
        <label htmlFor="resolution">Select Resolution: </label>
        <select
          defaultValue={'360p750kbs'}
          onChange={handleChange}
          className="bg-black text-white"
        >
          {resolutions.map((res) => (
            <option key={res.value} value={res.value}>
              {res.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HLSVideoPlayer;


// =============================



// import React, { useEffect, useRef, useState } from 'react';
// import Hls from 'hls.js';

// interface VideoPlayerProps {
//   streamUrl: string; // URL of the HLS stream
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element
//   const hlsRef = useRef<Hls | null>(null); // Reference to the Hls instance
//   const [isReady, setIsReady] = useState(false); // State to track if the stream is ready

//   useEffect(() => {
//     // Function to check if the stream URL is valid
//     const checkStreamReady = async (url: string) => {
//       try {
//         const response = await fetch(url, { method: "HEAD" }); // Use HEAD to check for the stream
//         // Check if the response is okay and has content-type indicating it's a playlist
//         if (response.ok && response.headers.get('Content-Type')?.includes('application/vnd.apple.mpegurl')) {
//           setIsReady(true); // Set ready state to true if it's a valid HLS stream
//         } else {
//           setIsReady(false); // Set ready state to false if not a valid HLS stream
//         }
//       } catch (error) {
//         console.error("Error checking stream URL:", error);
//         setIsReady(false); // Handle errors by setting ready state to false
//       }
//     };

//     // Check the stream URL to see if it's ready
//     const checkInterval = setInterval(() => {
//       checkStreamReady(streamUrl);
//     }, 5000); // Check every 5 seconds

//     // Clear the interval on component unmount
//     return () => clearInterval(checkInterval);
//   }, [streamUrl]);

//   useEffect(() => {
//     if (!videoRef.current || !Hls.isSupported() || !isReady) return; // Exit if not ready

//     const hls = new Hls(); // Create a new Hls instance
//     hlsRef.current = hls; // Store the Hls instance in ref

//     // Load the HLS source
//     hls.loadSource(streamUrl); // Load the stream URL
//     hls.attachMedia(videoRef.current); // Attach the media to the Hls instance

//     // Play the video when the manifest is parsed
//     hls.on(Hls.Events.MANIFEST_PARSED, () => {
//       videoRef.current?.play().catch((error) => {
//         console.error('Playback error: ', error);
//       });
//     });

//     // Cleanup on component unmount or when streamUrl changes
//     return () => {
//       if (hls) {
//         hls.destroy(); // Destroy the Hls instance on cleanup
//       }
//       hlsRef.current = null; // Clear the reference
//     };
//   }, [isReady, streamUrl]); // React to changes in readiness and stream URL

//   return (
//     <div>
//       <video
//         ref={videoRef} // Reference to the video element
//         controls
//         style={{ width: '100%', height: 'auto' }}
//         autoPlay // Attempt to autoplay the video
//         muted // Muted to comply with autoplay policies
//       />
//       {!isReady && <p>Loading stream...</p>} {/* Loading message while waiting for stream readiness */}
//     </div>
//   );
// };

// export default VideoPlayer;