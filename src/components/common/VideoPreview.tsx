import React, { useEffect, useRef } from "react";
import flvjs from "flv.js";
import Hls from "hls.js";

interface Props {
  videoUrl: string; // URL of the video (can be FLV or MP4)
  observerAutoPlayPause?: boolean;
}

const VideoPreview: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const flvPlayerRef = useRef<flvjs.Player | null>(null);
  const hlsPlayerRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    // Intersection Observer callback
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play video if in the viewport
          if (flvjs.isSupported() && videoUrl.endsWith(".flv")) {
            if (!flvPlayerRef.current) {
              // Initialize FLV.js player if not already initialized
              const flvPlayer = flvjs.createPlayer({
                type: "flv",
                url: videoUrl,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
              flvPlayerRef.current = flvPlayer;
            }
          } else if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
            if (!hlsPlayerRef.current) {
              const hls = new Hls();
              hls.loadSource(videoUrl);
              hls.attachMedia(video);
              hlsPlayerRef.current = hls;
            }
          } else {
            // For non-FLV videos, set the source dynamically
            if (!video.src) {
              video.src = videoUrl;
            }
          }
          video.play();
        } else {
          // Pause video when out of viewport
          video.pause();
        }
      });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe the video element

    observer.observe(video);

    // Cleanup on component unmount
    return () => {
      observer.unobserve(video);
      observer.disconnect();

      // Destroy FLV.js player if exists
      if (flvPlayerRef.current) {
        flvPlayerRef.current.destroy();
        flvPlayerRef.current = null;
      }
    };
  }, [videoUrl]);


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

//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     if (flvjs.isSupported() && videoUrl.endsWith(".flv")) {
//       if (!flvPlayerRef.current) {
//         const flvPlayer = flvjs.createPlayer({
//           type: "flv",
//           url: videoUrl,
//         });

//         flvPlayer.attachMediaElement(video);
//         flvPlayer.load();

//         flvPlayerRef.current = flvPlayer;
//       }
//     } else if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
//       if (!hlsPlayerRef.current) {
//         const hls = new Hls();
//         hls.loadSource(videoUrl);
//         hls.attachMedia(video);
//         hlsPlayerRef.current = hls;
//       }
//     } else {
//       video.src = videoUrl;
//     }

//     return () => {
//       if (flvPlayerRef.current) {
//         flvPlayerRef.current.destroy();
//         flvPlayerRef.current = null;
//       }

//       if (hlsPlayerRef.current) {
//         hlsPlayerRef.current.destroy();
//         hlsPlayerRef.current = null;
//       }
//     };
//   }, [videoUrl]);

//   return (
//     <video
//       ref={videoRef}
//       width="200"
//       height="200"
//       controlsList="nodownload"
//       onContextMenu={(e) => e.preventDefault()}
//       controls
//       className="w-full h-full max-h-[500px] object-contain"

//     >
//       Your browser does not support the video tag.
//     </video>
//   );
// };

// export default VideoPreview;
