import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FaPause, FaPlay } from "@/components/videoPlayer/icons/Icons";

interface Props {
  videoUrl: string;
}

const VideoPreview: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
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

  const PlayPaused = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setPaused(false);
    } else {
      videoRef.current?.pause();
      setPaused(true);
    }
  };

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 w-full flex flex-col z-10">
        <div></div>
        <div className="flex">
          <Button size="icon" variant="ghost" onClick={PlayPaused}>
            {!paused ? FaPause : FaPlay}{" "}
          </Button>
        </div>
      </div>
      <video
        width="200"
        height="200"
        controlsList="nodownload"
        onContextMenu={() => false}
        loop
        className="w-full h-full max-h-[500px] object-contain"
        ref={videoRef}
        onClick={PlayPaused}
      >
        {/* <source src={videoUrl} type="video/mp4" /> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPreview;
