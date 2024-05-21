// import VideoPlayer from "@/components/common/VideoPlayer";

import VideoCardArea from "@/components/videos/VideoCardArea";
import VideoPostArea from "@/components/videos/VideoPostArea";


const Videos = () => {


  return (
    <div className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full flex gap-8">
    <VideoPostArea />
    <VideoCardArea />
  </div>
  );
};

export default Videos;
