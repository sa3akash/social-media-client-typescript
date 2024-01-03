import { VideoUtils } from "@/services/utils/videoUtils";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  videoUrl: string;
}

const VideoPreview: React.FC<Props> = ({ videoUrl }) => {
  const [backgroundVideoColor, setBackgroundVideoColor] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const getBackgroundVideoColor = async (url: string) => {
    try {
      const bgColor = await VideoUtils.getBackgroundVideoColor(url);
      setBackgroundVideoColor(`${bgColor}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBackgroundVideoColor(videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    // Intersection Observer options
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };
    // Callback fired when the video enters or leaves the viewport
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!video!.src) {
            video!.src = videoUrl;
          }
          video!.play().catch((error) => {
            console.log("Failed to play video:", error);
          });
        } else {
          video!.pause(); // Pause when video leaves viewport
        }
      });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);
    // Observe the video element
    if (video) {
      observer.observe(video as HTMLVideoElement);
    }
    // Cleanup the Intersection Observer when component unmounts
    return () => {
      observer.unobserve(video as HTMLVideoElement);
      observer.disconnect();
    };
  }, [videoUrl]);

  return (
    <video
      width="200"
      height="200"
      controls
      controlsList="nodownload"
      onContextMenu={() => false}
      loop
      style={{ background: backgroundVideoColor }}
      className="w-full h-full max-h-[500px] object-contain"
      ref={videoRef}
    >
      {/* <source src={videoUrl} type="video/mp4" /> */}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreview;
