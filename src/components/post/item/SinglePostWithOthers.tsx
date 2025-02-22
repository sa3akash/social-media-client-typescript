import { FC, useRef } from "react";
import PostHeader from "@/components/post/item/PostHeader";
import PostActions from "@/components/post/item/PostActions";
import CommentAction from "@/components/post/item/CommentAction";
import ImagesShow from "@/components/post/item/ImagesShow";
import PostReactions from "@/components/post/item/PostReactions";
import { IPostDoc } from "@/interfaces/post.interface";
import PostText from "@/components/post/item/PostText";
import GifPreview from "@/components/common/GifPreview";
import HLSVideoPlayer from "@/components/common/HLSVideoPlayer";

interface Props {
  item: IPostDoc;
}
const SinglePostWithOthers: FC<Props> = ({ item }) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <PostHeader
        user={item.creator}
        createAt={item.createdAt}
        feelings={item.feelings}
        post={item}
      />
      <PostText item={item} />
      {/* image preview */}
      {item.files?.length > 0 && !item.gifUrl && (
        <ImagesShow images={item.files} />
      )}
      {item.gifUrl && item.files?.length === 0 && (
        <GifPreview gifUrl={item.gifUrl} />
      )}

      {item.live && item.liveUrl && (
        <HLSVideoPlayer videoUrl={`/live/${item.liveUrl}.m3u8`} />
      )}

      {/* actions */}
      <PostReactions post={item} />
      <PostActions commentInputRef={commentInputRef} postId={item._id} />
      <CommentAction commentInputRef={commentInputRef} postId={item._id} />
    </>
  );
};

export default SinglePostWithOthers;
