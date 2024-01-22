// import VideoPlayer from "@/components/common/VideoPlayer";
import useVideoVisibility from "@/hooks/useVideoVisibility";
import { ImageUtils } from "@/services/utils/imageUtils";
import { VideoUtils } from "@/services/utils/videoUtils";
import { useEffect, useRef, useState } from "react";

const videoUrl = "/5.mp4";

const Videos = () => {
  const [image, setImage] = useState("");
  const [bgColor, setBGColor] = useState("");

  useEffect(() => {
    VideoUtils.getThumbnail(videoUrl, 1)
      .then((result) => {
        setImage(result);
      })
      .catch((error) => {
        console.log(error);
      });

    VideoUtils.checkVideoHorizontalOrVertical(videoUrl);
  }, []);

  useEffect(() => {
    ImageUtils.getBackgroundImageColor(image).then((color) => {
      setBGColor(color as string);
    });
  }, [image]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoVisibility(videoRef);

  return (
    <div className="relative w-full h-full after:bg-black">
      <div className="absolute top-0 left-0 w-full h-[90%] flex items-center justify-center z-40">
        <video
          ref={videoRef}
          width={464}
          height={825}
          src={videoUrl}
          loop
          controls
          className="flex items-center object-contain justify-center rounded-md w-[464px] h-[825px]"
          style={{ backgroundColor: bgColor ? bgColor : "#000" }}
          autoPlay
        ></video>
      </div>
      <img
        src={image}
        className="w-full h-full object-cover pointer-events-none select-none blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  );
};

export default Videos;
