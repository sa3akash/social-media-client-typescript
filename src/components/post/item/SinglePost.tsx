import { IPostDoc } from "@/interfaces/post.interface";
import { LegacyRef, forwardRef } from "react";
import SinglePostWithOthers from "./SinglePostWithOthers";

interface Props {
  item: IPostDoc;
}

const SinglePost = forwardRef(
  ({ item }: Props, ref: LegacyRef<HTMLDivElement>) => {
    // const [isVideo, setIsVideo] = useState(false);

    // useEffect(() => {
    //   if (item.files?.length > 0) {
    //     const { fileType } = Utils.checkFileUrl(item.files[0]?.url);
    //     setIsVideo(fileType === "video");
    //   }
    // }, [item.files]);

    return (
      <div className="cardBG md:rounded-xl relative" ref={ref}>
        {/* {isVideo ? (
          <SinglePostWithVideo item={item} />
        ) : (
          <SinglePostWithOthers item={item} />
        )} */}
        <SinglePostWithOthers item={item} />
      </div>
    );
  }
);

export default SinglePost;
