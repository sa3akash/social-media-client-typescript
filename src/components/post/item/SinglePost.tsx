import { LegacyRef, forwardRef, useRef } from "react";
import PostHeader from "@/components/post/item/PostHeader";
import PostActions from "@/components/post/item/PostActions";
import CommentAction from "@/components/post/item/CommentAction";
import ImagesShow from "@/components/post/item/ImagesShow";
import PostReactions from "@/components/post/item/PostReactions";
import { IPostDoc } from "@/interfaces/post.interface";
import PostText from "@/components/post/item/PostText";
import GifPreview from "@/components/common/GifPreview";

interface Props {
  item: IPostDoc;
}

const SinglePost = forwardRef(
  ({ item }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const commentInputRef = useRef<HTMLInputElement | null>(null);
    return (
      <div className="cardBG md:rounded-xl relative" ref={ref}>
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
        {/* actions */}
        <PostReactions post={item} />
        <PostActions commentInputRef={commentInputRef} postId={item._id} />
        <CommentAction commentInputRef={commentInputRef} postId={item._id}/>
      </div>
    );
  }
);

export default SinglePost;
