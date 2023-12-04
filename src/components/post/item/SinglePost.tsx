import { IPostDoc } from "@/data/PostData";
import React, { useRef } from "react";
import PostHeader from "@/components/post/item/PostHeader";
import PostActions from "@/components/post/item/PostActions";
import CommentAction from "@/components/post/item/CommentAction";
import ImagesShow from "@/components/post/item/ImagesShow";
import PostReactions from "@/components/post/item/PostReactions";

interface Props {
  item: IPostDoc;
}

const SinglePost: React.FC<Props> = ({ item }) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="cardBG md:rounded-xl">
      <PostHeader user={item.creator} createAt={item.createdAt} />
      <div className="text-[14px] tracking-[0.1px] leading-6 px-4 pb-4">
        One of the perks of working in an international company is sharing
        knowledge with your colleagues.
      </div>
      {/* image preview */}
      {item.files?.length > 0 && <ImagesShow images={item.files} />}

      {/* actions */}
      <PostReactions />
      <PostActions commentInputRef={commentInputRef} />
      <CommentAction commentInputRef={commentInputRef} />
    </div>
  );
};

export default SinglePost;
