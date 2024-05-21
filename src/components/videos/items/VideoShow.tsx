import { VideoPlayerCustom } from "@/components/videoPlayer/VideoPlayerCustom";
import { IPostDoc } from "@/interfaces/post.interface";
import { FC } from "react";

interface Props {
  item: IPostDoc;
}

const VideoShow: FC<Props> = ({ item }) => {
  return (
    <div className="relative">
      <VideoPlayerCustom
        src={item.files[0].path}
        width="100%"
        height="450px"
        className="w-full object-cover"
      />
      <div className="absolute right-0 bottom-0">user</div>
    </div>
  );
};

export default VideoShow;
