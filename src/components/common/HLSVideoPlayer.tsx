import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  videoUrl: string; // HLS stream URL (.m3u8 format)
}

const HLSVideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsInstanceRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    // Callback for Intersection Observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (Hls.isSupported()) {
            if (!hlsInstanceRef.current) {
              // Initialize Hls.js
              const hls = new Hls();
              hls.loadSource(videoUrl);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch((error) => {
                  console.log("Failed to play video:", error);
                });
              });
              hlsInstanceRef.current = hls;
            } else {
              video.play().catch((error) => {
                console.log("Failed to play video:", error);
              });
            }
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Fallback for Safari and native HLS support
            video.src = videoUrl;
            video.play().catch((error) => {
              console.log("Failed to play video:", error);
            });
          }
        } else {
          video.pause(); // Pause video when leaving the viewport
        }
      });
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(video);

    // Cleanup on component unmount
    return () => {
      observer.unobserve(video);
      observer.disconnect();

      // Destroy Hls.js instance
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      controls
      width="400"
      height="300"
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-full max-h-[500px] object-contain"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default HLSVideoPlayer;
