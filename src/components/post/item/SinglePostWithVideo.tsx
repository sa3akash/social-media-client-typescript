import { FC, useRef, useState } from "react";
import PostHeader from "@/components/post/item/PostHeader";
import PostActions from "@/components/post/item/PostActions";
import CommentAction from "@/components/post/item/CommentAction";
import PostReactions from "@/components/post/item/PostReactions";
import { IPostDoc } from "@/interfaces/post.interface";
import { Link } from "react-router-dom";
import VideoPreview from "@/components/common/VideoPreview";
import { extractHashTages } from "@/services/genaral/descriptionHashTagExtract";

interface Props {
  item: IPostDoc;
}
const SinglePostWithVideo: FC<Props> = ({ item }) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const [descriptSplice, setDescriptionSplice] = useState(false);

  const { hashTag, originalString } = extractHashTages(
    item.description,
    "search"
  );

  return (
    <>
      <PostHeader
        user={item.creator}
        createAt={item.createdAt}
        feelings={item.feelings}
        post={item}
      />
      <div className="">
        <VideoPreview videoUrl={item.files[0]?.url} />
      </div>

      <div className="flex flex-col gap-3 px-4 pt-4">
        <div className="text-base text-emerald-400 flex items-center gap-2 line-clamp-1">
          {hashTag.map((text: string, i: number) => (
            <Link to="" className="hover:underline" key={i}>
              {text}
            </Link>
          ))}
        </div>
        <h3 className="font-semibold leading-none tracking-tight line-clamp-1">{item.post}</h3>
        <div className="text-sm text-muted-foreground">
          <p
            className={descriptSplice ? "" : "line-clamp-2"}
            dangerouslySetInnerHTML={{
              __html: `${originalString}`,
            }}
          />
          {item.description?.length > 120 && (
            <span
              className="text-primary hover:underline cursor-pointer "
              onClick={() => {
                setDescriptionSplice((prev) => !prev );
              }}
            >
              {descriptSplice ? "see more" : "see less"}
            </span>
          )}
        </div>
      </div>

      {/* actions */}
      <PostReactions post={item} />
      <PostActions commentInputRef={commentInputRef} postId={item._id} />
      <CommentAction commentInputRef={commentInputRef} postId={item._id} />
    </>
  );
};

export default SinglePostWithVideo;
