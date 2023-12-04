import LoveIcon from "@/assets/images/ic_like.svg";
import CommentIcon from "@/assets/images/ic_comment.svg";
import ShareIcon from "@/assets/images/ic_Share.svg";
import SaveIcon from "@/assets/images/ic_Saved2.svg";

interface Props {
  commentInputRef: React.MutableRefObject<null|HTMLInputElement>;
}

const PostActions:React.FC<Props> = ({commentInputRef}) => {
  return (
    <div className="px-4 py-1 border-t border-b">
      <div className="flex items-center justify-around gap-2 select-none">
        <div className="flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer" onClick={()=>commentInputRef.current?.focus()}>
          <img src={CommentIcon} alt="comment" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Comments
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full gap-2 py-2 px-2 rounded-sm dark:hover:bg-[#292932] cursor-pointer">
          <img src={LoveIcon} alt="love" className="cursor-pointer" />
          <div className="hidden sm:block roboto text-[14px] tracking-[0.1px] cursor-pointer">
            Likes
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
