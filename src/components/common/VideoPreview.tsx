import React, { useEffect, useRef } from "react";  
import flvjs from "flv.js";  
import Hls from "hls.js";  

interface Props {  
  videoUrl: string;  
}  

const VideoPreview: React.FC<Props> = ({ videoUrl }) => {  
  const videoRef = useRef<HTMLVideoElement>(null);  
  const flvPlayerRef = useRef<flvjs.Player | null>(null);  
  const hlsPlayerRef = useRef<Hls | null>(null);  
  const previousUrlRef = useRef<string | null>(null); // Track previous video URL  

  useEffect(() => {  
    const video = videoRef.current;  

    if (!video) return; // Ensure the video reference is valid  

    const initializePlayer = () => {  
      if (flvjs.isSupported() && videoUrl?.endsWith(".flv")) {  
        if (!flvPlayerRef.current) {  
          const flvPlayer = flvjs.createPlayer({  
            type: "flv",  
            url: videoUrl,  
            isLive: false,  
          });  
          flvPlayer.attachMediaElement(video);  
          flvPlayer.load();  
          flvPlayerRef.current = flvPlayer;  
          console.log("FLV player initialized");  
        }  
      } else if (Hls.isSupported() && videoUrl?.endsWith(".m3u8")) {  
        if (!hlsPlayerRef.current) {  
          const hls = new Hls();  
          hls.loadSource(videoUrl);  
          hls.attachMedia(video);  
          hlsPlayerRef.current = hls;  
          console.log("HLS player initialized");  
        }  
      } else {  
        video.src = videoUrl;  
        video.load();  
        console.log("Video source set directly");  
      }  
    };  

    const destroyPlayers = () => {  
      if (flvPlayerRef.current) {  
        flvPlayerRef.current.destroy();  
        flvPlayerRef.current = null;  
        console.log("FLV player destroyed");  
      }  
      if (hlsPlayerRef.current) {  
        hlsPlayerRef.current.destroy();  
        hlsPlayerRef.current = null;  
        console.log("HLS player destroyed");  
      }  
    };  

    // Only initialize player if videoUrl has changed  
    if (previousUrlRef.current !== videoUrl) {  
      console.log("Video URL changed. Destroying previous players...");  
      destroyPlayers(); // Ensure players are destroyed before initializing new ones  
      initializePlayer();  
      previousUrlRef.current = videoUrl; // Update previousUrlRef  
    }  

    return () => {  
      destroyPlayers();
    };  
  }, [videoUrl]); // Only re-run if videoUrl changes  

  useEffect(() => {  
    const video = videoRef.current;  

    if (!video) return;  

    const observer = new IntersectionObserver(  
      (entries) => {  
        entries.forEach((entry) => {  
          if (entry.isIntersecting) {  
            video.play().catch((error) => console.error("Play failed:", error));  
          } else {  
            video.pause();  
          }  
        });  
      },  
      { threshold: 0.5 }  
    );  

    observer.observe(video);  

    return () => {  
      observer.unobserve(video);  
      observer.disconnect();  
    };  
  }, []);  

  return (  
    <video  
      width="200"  
      height="200"  
      controlsList="nodownload"  
      onContextMenu={(e) => e.preventDefault()}  
      loop  
      controls  
      className="w-full h-full max-h-[500px] object-contain"  
      ref={videoRef}  
    >  
      Your browser does not support the video tag.  
    </video>  
  );  
};  

export default VideoPreview;



// import React, { useEffect, useRef } from "react";  
// import flvjs from "flv.js";  
// import Hls from "hls.js";  

// interface Props {  
//   videoUrl: string;  
// }  

// const VideoPreview: React.FC<Props> = ({ videoUrl }) => {  
//   const videoRef = useRef<HTMLVideoElement>(null);  
//   const flvPlayerRef = useRef<flvjs.Player | null>(null);  
//   const hlsPlayerRef = useRef<Hls | null>(null);  
//   const previousUrlRef = useRef<string | null>(null); // Track previous video URL  

//   useEffect(() => {  
//     const video = videoRef.current;  

//     if (!video) return; // Ensure the video reference is valid  

//     const initializePlayer = () => {  
//       if (flvjs.isSupported() && videoUrl?.endsWith(".flv")) {  
//         if (!flvPlayerRef.current) {  
//           const flvPlayer = flvjs.createPlayer({  
//             type: "flv",  
//             url: videoUrl,  
//             isLive: false,  
//           });  
//           flvPlayer.attachMediaElement(video);  
//           flvPlayer.load();  
//           flvPlayerRef.current = flvPlayer;  
//           console.log("FLV player initialized");  
//         }  
//       } else if (Hls.isSupported() && videoUrl?.endsWith(".m3u8")) {  
//         if (!hlsPlayerRef.current) {  
//           const hls = new Hls();  
//           hls.loadSource(videoUrl);  
//           hls.attachMedia(video);  
//           hlsPlayerRef.current = hls;  
//           console.log("HLS player initialized");  
//         }  
//       } else {  
//         video.src = videoUrl;  
//         video.load();  
//         console.log("Video source set directly");  
//       }  
//     };  

//     const destroyPlayers = () => {  
//       if (flvPlayerRef.current) {  
//         flvPlayerRef.current.destroy();  
//         flvPlayerRef.current = null;  
//         console.log("FLV player destroyed");  
//       }  
//       if (hlsPlayerRef.current) {  
//         hlsPlayerRef.current.destroy();  
//         hlsPlayerRef.current = null;  
//         console.log("HLS player destroyed");  
//       }  
//     };  

//     // Only initialize player if videoUrl has changed  
//     if (previousUrlRef.current !== videoUrl) {  
//       console.log("Video URL changed. Destroying previous players...");  
//       destroyPlayers(); // Ensure players are destroyed before initializing new ones  
//       initializePlayer();  
//       previousUrlRef.current = videoUrl; // Update previousUrlRef  
//     }  

//     return () => {  
//       destroyPlayers();  
//     };  
//   }, [videoUrl]); // Only re-run if videoUrl changes  

//   useEffect(() => {  
//     const video = videoRef.current;  

//     if (!video) return;  

//     const observer = new IntersectionObserver(  
//       (entries) => {  
//         entries.forEach((entry) => {  
//           if (entry.isIntersecting) {  
//             video.play().catch((error) => console.error("Play failed:", error));  
//           } else {  
//             video.pause();  
//           }  
//         });  
//       },  
//       { threshold: 0.5 }  
//     );  

//     observer.observe(video);  

//     return () => {  
//       observer.unobserve(video);  
//       observer.disconnect();  
//     };  
//   }, []);  

//   return (  
//     <video  
//       width="200"  
//       height="200"  
//       controlsList="nodownload"  
//       onContextMenu={(e) => e.preventDefault()}  
//       loop  
//       controls  
//       className="w-full h-full max-h-[500px] object-contain"  
//       ref={videoRef}  
//     >  
//       Your browser does not support the video tag.  
//     </video>  
//   );  
// };  

// export default VideoPreview;














// import React, { useEffect, useRef } from "react";  
// import flvjs from "flv.js";  
// import Hls from "hls.js";  

// interface Props {  
//   videoUrl: string;  
// }  

// const VideoPreview: React.FC<Props> = ({ videoUrl }) => {  
//   const videoRef = useRef<HTMLVideoElement>(null);  
//   const flvPlayerRef = useRef<flvjs.Player | null>(null);  
//   const hlsPlayerRef = useRef<Hls | null>(null);  

//   useEffect(() => {  
//     const video = videoRef.current;  

//     if (!video) return;  

//     const initializePlayer = () => {  
//       if (flvjs.isSupported() && videoUrl?.endsWith(".flv")) {  
//         if (!flvPlayerRef.current) {  
//           const flvPlayer = flvjs.createPlayer({  
//             type: "flv",  
//             url: videoUrl,  
//             isLive: false,  
//           });  
//           flvPlayer.attachMediaElement(video);  
//           flvPlayer.load();  
//           flvPlayerRef.current = flvPlayer;  
//         }  
//       } else if (Hls.isSupported() && videoUrl?.endsWith(".m3u8")) {  
//         if (!hlsPlayerRef.current) {  
//           const hls = new Hls();  
//           hls.loadSource(videoUrl);  
//           hls.attachMedia(video);  
//           hlsPlayerRef.current = hls;  
//         }  
//       } else {  
//         video.src = videoUrl;  
//         video.load();  
//         // video.play();  
//       }  
//     };  

//     const destroyPlayers = () => {  
//       if (flvPlayerRef.current) {  
//         flvPlayerRef.current.destroy();  
//         flvPlayerRef.current = null;  
//       }  
//       if (hlsPlayerRef.current) {  
//         hlsPlayerRef.current.destroy();  
//         hlsPlayerRef.current = null;  
//       }  
//     };  

//     destroyPlayers(); // Ensure players are destroyed before initializing new ones  
//     initializePlayer();  

//     return () => {  
//       destroyPlayers();  
//     };  
//   }, [videoUrl]);  

//   useEffect(() => {  
//     const video = videoRef.current;  

//     if (!video) return;  

//     const observer = new IntersectionObserver(  
//       (entries) => {  
//         entries.forEach((entry) => {  
//           if (entry.isIntersecting) {  
//             video.play().catch((error) => console.error("Play failed:", error));  
//           } else {  
//             video.pause();  
//           }  
//         });  
//       },  
//       { threshold: 0.5 }  
//     );  

//     observer.observe(video);  

//     return () => {  
//       observer.unobserve(video);  
//       observer.disconnect();  
//     };  
//   }, []);  

//   return (  
//     <video  
//       width="200"  
//       height="200"  
//       controlsList="nodownload"  
//       onContextMenu={(e) => e.preventDefault()}  
//       loop  
//       controls  
//       className="w-full h-full max-h-[500px] object-contain"  
//       ref={videoRef}  
//     >  
//       Your browser does not support the video tag.  
//     </video>  
//   );  
// };  

// export default VideoPreview;










// import React, { useEffect, useRef } from "react";
// import flvjs from "flv.js";
// import Hls from "hls.js";

// interface Props {
//   videoUrl: string;
// }

// const VideoPreview: React.FC<Props> = ({ videoUrl }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const flvPlayerRef = useRef<flvjs.Player | null>(null);
//   const hlsPlayerRef = useRef<Hls | null>(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     // Initialize the player based on the video format
//     const initializePlayer = () => {
//       if (flvjs.isSupported() && videoUrl?.endsWith(".flv")) {
//         if (!flvPlayerRef.current) {
//           const flvPlayer = flvjs.createPlayer({
//             type: "flv",
//             url: videoUrl,
//             isLive: false, // Set to true for live streaming
//           });
//           flvPlayer.attachMediaElement(video);
//           flvPlayer.load();
//           flvPlayerRef.current = flvPlayer;
//         }
//       } else if (Hls.isSupported() && videoUrl?.endsWith(".m3u8")) {
//         if (!hlsPlayerRef.current) {
//           const hls = new Hls();
//           hls.loadSource(videoUrl);
//           hls.attachMedia(video);
//           hlsPlayerRef.current = hls;
//         }
//       } else {
//         video.src = videoUrl;
//         video.load();
//         video.readyState > 1 && video.play();
//       }
//     };

//     // Cleanup players
//     const destroyPlayers = () => {
//       if (flvPlayerRef.current) {
//         flvPlayerRef.current.destroy();
//         flvPlayerRef.current = null;
//       }
//       if (hlsPlayerRef.current) {
//         hlsPlayerRef.current.destroy();
//         hlsPlayerRef.current = null;
//       }
//     };

//     // Initialize the player
//     initializePlayer();

//     // Cleanup on unmount or videoUrl change
//     return () => {
//       destroyPlayers();
//     };
//   }, [videoUrl]);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             video.play();
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Adjust as needed
//     );

//     observer.observe(video);

//     return () => {
//       observer.unobserve(video);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <video
//       width="200"
//       height="200"
//       controlsList="nodownload"
//       onContextMenu={(e) => e.preventDefault()}
//       loop
//       controls
//       className="w-full h-full max-h-[500px] object-contain"
//       ref={videoRef}
//     >
//       Your browser does not support the video tag.
//     </video>
//   );
// };

// export default VideoPreview;
