import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  streamUrl: string; // URL of the HLS stream
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const hls = new Hls();

    // Load the stream
    hls.loadSource(streamUrl);
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
    };
  }, [streamUrl]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", height: "auto" }}
        autoPlay
        muted
      />
    </div>
  );
};

export default VideoPlayer;



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