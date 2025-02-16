import { useEffect, useRef } from "react";

interface Props {
  videoUrl: string;
}

const VideoPreview: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);



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

  return (
    <video
      width="200"
      height="200"
      controlsList="nodownload"
      onContextMenu={() => false}
      loop
      controls
      className="w-full h-full max-h-[500px] object-contain"
      ref={videoRef}
    >
      {/* <source src={videoUrl} type="video/mp4" /> */}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreview;
