import { VideoPlayer } from "@/components/videoPlayer/VideoPlayer"
import { VideoUtils } from "@/services/utils/videoUtils";
import { useEffect, useState } from "react";

const Evants = () => {
  const [image, setImage] = useState("");


  const videoUrl = "/4.mp4";

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
  return (
    <div>
      <VideoPlayer src={videoUrl} setQuality={()=>{}} poster={image}/>
    </div>
  )
}

export default Evants