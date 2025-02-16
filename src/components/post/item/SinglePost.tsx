import { IPostDoc } from "@/interfaces/post.interface";
import { Utils } from "@/services/utils/utils";
import { LegacyRef, forwardRef, useEffect, useState } from "react";
import SinglePostWithOthers from "./SinglePostWithOthers";
import SinglePostWithVideo from "./SinglePostWithVideo";


interface Props {
  item: IPostDoc;
}

const SinglePost = forwardRef(
  ({ item }: Props, ref: LegacyRef<HTMLDivElement>) => {

    const [isVideo,setIsVideo] = useState(false)


    useEffect(()=>{
      if(item.files.length > 0){
        const {fileType} = Utils.checkFileUrl(item.files[0]?.url);
        setIsVideo(fileType === 'video')
      }

    },[item.files]);


    return (
      <div className="cardBG md:rounded-xl relative" ref={ref}>
        {isVideo ? (
          <SinglePostWithVideo item={item}/>
        ):(
          <SinglePostWithOthers item={item}/>
        )}
      </div>
    );
  }
);

export default SinglePost;
