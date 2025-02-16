import { VideoPlayer } from "@/components/videoPlayer/VideoPlayer"
import { Utils } from "@/services/utils/utils";
import { VideoUtils } from "@/services/utils/videoUtils";
import { useEffect, useState } from "react";

const Evants = () => {
  const [image, setImage] = useState("");


  const videoUrl = "/uploads/posts/673e3c4dbe9e725fe8489063/673e3d4fbe9e725fe84890c7/673e3d4fbe9e725fe84890c7-673e3c4dbe9e725fe8489063-1732132281418.mp4";

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


  const input = "hi this is my string #book #love #sa2 hello everyone #shakil #sa3akash";  

  console.log(Utils.extractHashtags(input));




  return (
    <section className="w-full h-full">
      <div className=" h-[800px] ">
      {/* <VideoPlayer src={videoUrl} setQuality={()=>{}} poster={image}/> */}
      </div>
    </section>
  )
}

export default Evants