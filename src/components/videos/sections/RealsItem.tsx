import { ImageUtils } from "@/services/utils/imageUtils";
import { VideoUtils } from "@/services/utils/videoUtils";
import { useEffect, useRef, useState } from "react";

const RealsItem = ({ videoUrl }: { videoUrl: string }) => {
  const [image, setImage] = useState("");
  const [bgColor, setBGColor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    VideoUtils.getThumbnail(videoUrl, 1)
      .then((result) => {
        setImage(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [videoUrl]);

  useEffect(() => {
    ImageUtils.getBackgroundImageColor(image).then((color) => {
      setBGColor(color as string);
    });

    if (isPlaying) {
      const video = videoRef.current;
      video?.play().catch((error) => {
        console.log("Failed to play video:", error);
      });
    } else {
      const video = videoRef.current;
      video?.pause();
    }
  }, [image, isPlaying]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsPlaying(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const video = videoRef.current;
    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
      observer.disconnect();
    };
  }, [videoUrl, isPlaying]);

  return (
    <div className="relative w-full h-full scrollTypeItem">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40">
        <video
          ref={videoRef}
          width={464}
          height={825}
          src={videoUrl}
          loop
          className="flex items-center object-contain justify-center rounded-md w-[464px] h-[825px]"
          style={{ backgroundColor: bgColor ? bgColor : "#000" }}
          autoPlay
          onDoubleClick={() => {
            console.log("double click");
          }}
          onClick={() => {
            videoRef.current?.paused
              ? videoRef.current.play()
              : videoRef.current?.pause();
          }}
        ></video>
      </div>
      <img
        src={image}
        className="w-full h-full object-cover pointer-events-none select-none blur-sm"
      />
      <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-40 z-10"></div>
    </div>
  );
};

export default RealsItem;
