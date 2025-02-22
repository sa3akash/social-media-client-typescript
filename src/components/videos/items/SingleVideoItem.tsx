import CommentAction from "@/components/post/item/CommentAction";
import ImagesShow from "@/components/post/item/ImagesShow";
import PostActions from "@/components/post/item/PostActions";
import PostHeader from "@/components/post/item/PostHeader";
import PostReactions from "@/components/post/item/PostReactions";
import PostText from "@/components/post/item/PostText";
import { IPostDoc } from "@/interfaces/post.interface";
import { LegacyRef, forwardRef, useRef } from "react";

interface Props {
  item: IPostDoc;
}

const SingleVideoItem = forwardRef(
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
        {/* actions */}
        <PostReactions post={item} />
        <PostActions commentInputRef={commentInputRef} postId={item._id} />
        <CommentAction commentInputRef={commentInputRef} postId={item._id} />
      </div>
    );
  }
);

export default SingleVideoItem;
