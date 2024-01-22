import { useEffect } from "react";

const useVideoVisibility = (videoRef: React.RefObject<HTMLVideoElement>) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef]);
};

export default useVideoVisibility;
