import LoveIcon from "@/assets/images/ic_like.svg";
import CommentIcon from "@/assets/images/ic_comment.svg";
import ShareIcon from "@/assets/images/ic_Share.svg";
import SaveIcon from "@/assets/images/ic_Saved2.svg";
import { ReactionIconMapGif, ReactionsList } from "@/services/utils/map";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  commentInputRef: React.MutableRefObject<null | HTMLInputElement>;
  postId: string;
}

const PostActions: React.FC<Props> = ({ commentInputRef, postId }) => {
  const [openReaction, setOpenReaction] = useState(false);

  return (
    <div className="px-4 py-1 border-t border-b">
      <div className="flex items-center justify-around gap-2 select-none">
        <div
          className="flex-1 flex items-center justify-center w-full gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer"
          onMouseEnter={() => setOpenReaction(true)}
          onMouseLeave={() => setOpenReaction(false)}
        >
          <img src={LoveIcon} alt="love" className="cursor-pointer" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Likes
          </div>
          <div
            className={cn(
              "absolute p-2 rounded-full border left-4 bottom-[118px] bg-[#292932] flex items-center gap-2",
              openReaction ? "flex" : "hidden"
            )}
          >
            {ReactionsList.map((type, index) => (
              <SingleReaciton type={type} key={index} postId={postId} />
            ))}
          </div>
        </div>

        <div
          className="flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer"
          onClick={() => commentInputRef.current?.focus()}
        >
          <img src={CommentIcon} alt="comment" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Comments
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer">
          <img src={ShareIcon} alt="share" className="cursor-pointer" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Share
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer">
          <img src={SaveIcon} alt="saved" className="cursor-pointer" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Saved
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActions;

const SingleReaciton = ({ type, postId }: { type: string; postId: string }) => {
  const reactionIcon = ReactionIconMapGif[
    type as keyof typeof ReactionIconMapGif
  ] as string;

  const handleReactionClick = () => {
    console.log(type, postId);
  };

  return (
    <div
      className="hover:scale-125 z-20 transition-none w-10 h-10 object-cover rounded-full flex items-center justify-center"
      onClick={handleReactionClick}
      onTouchStart={handleReactionClick}
    >
      <img
        src={reactionIcon}
        alt={type}
        className="w-full h-full object-cover bg-white"
      />
    </div>
  );
};
