import VideoPlayer from "@/components/common/VideoPlayer";
import { VideoUtils } from "@/services/utils/videoUtils";
import { useEffect, useState } from "react";

const videoUrl =
  "https://res.cloudinary.com/dkj7w978g/video/upload/v1704278561/zx1oh09d2ujirn8npnvl.mp4";

const Videos = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    VideoUtils.getVideoThumbnail(videoUrl, (image: string | null) => {
      if (image) setImage(image);
    });
  }, []);

  return (
    <div className="w-[200px]">
      <VideoPlayer videoUrl={videoUrl}/>
      <img width={800} height={500} src={image} alt="" />
    </div>
  );
};

export default Videos;
