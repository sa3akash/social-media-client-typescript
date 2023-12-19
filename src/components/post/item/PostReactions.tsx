import LikeIcon from "@/assets/reactions/like.svg";
import LoveIcon from "@/assets/reactions/love.svg";
import CareIcon from "@/assets/reactions/care.svg";
import millify from "millify";
import CommentIcon from "@/assets/images/ic_comment.svg";
import ShareIcon from "@/assets/images/ic_Share.svg";
import SaveIcon from "@/assets/images/ic_Saved2.svg";



const PostReactions = () => {
  return (
    <div className="px-4 py-2 flex items-center justify-between select-none">
      <div className="flex items-center py-2 gap-2">
        <div className="flex items-center">
        <img src={LikeIcon} alt="like" className="w-5 cursor-pointer" />
        <img src={LoveIcon} alt="love" className="w-5 cursor-pointer" />
        <img src={CareIcon} alt="care" className="w-5 cursor-pointer" />
        </div>
        <div className="cursor-pointer hover:underline reactText">{millify(120000)}</div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="reactText flex items-center gap-1">
          <span>{millify(1200)}</span>
          <span className="hidden sm:block">Comments</span>
          <img src={CommentIcon} alt="comment" className="sm:hidden w-5"/>
        </div>
        <div className="reactText flex items-center gap-1">
          <span>{millify(1100)}</span>
          <span className="hidden sm:block">Share</span>
          <img src={ShareIcon} alt="comment" className="sm:hidden w-5"/>
        </div>
        <div className="reactText flex items-center gap-1">
          <span>{millify(400)}</span>
           <span className="hidden sm:block">Saved</span>
          <img src={SaveIcon} alt="comment" className="sm:hidden w-5"/>
          </div>
      </div>
    </div>
  );
};

export default PostReactions;
