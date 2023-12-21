import LikeIcon from "@/assets/reactions/like.svg";
import LoveIcon from "@/assets/reactions/love.svg";
import CareIcon from "@/assets/reactions/care.svg";
import millify from "millify";
import CommentIcon from "@/assets/images/ic_comment.svg";
import ShareIcon from "@/assets/images/ic_Share.svg";
import SaveIcon from "@/assets/images/ic_Saved2.svg";
import DrawerModelProvider from "@/components/providers/DrawerModelProvider";
import ReactionModel from "@/components/models/ReactionModel";
import CommentsModel from "@/components/models/CommentsModel";
import { IPostDoc } from "@/data/PostData";
import React from "react";


interface Props {
  post: IPostDoc
}

const PostReactions:React.FC<Props> = ({post}) => {

  return (
    <div className="px-4 py-2 flex items-center justify-between select-none">
      <div className="flex items-center py-2 gap-2">
        <div className="flex items-center">
          <DrawerModelProvider modelContent={<ReactionModel post={post} reactionType="like"/>}>
            <img src={LikeIcon} alt="like" className="w-5 cursor-pointer" />
          </DrawerModelProvider>
          <DrawerModelProvider modelContent={<ReactionModel post={post} reactionType="love"/>}>
            <img src={LoveIcon} alt="love" className="w-5 cursor-pointer" />
          </DrawerModelProvider>
          <DrawerModelProvider modelContent={<ReactionModel post={post} reactionType="care"/>}>
            <img src={CareIcon} alt="care" className="w-5 cursor-pointer" />
          </DrawerModelProvider>
        </div>
        <DrawerModelProvider modelContent={<ReactionModel post={post} reactionType="all"/>}>
          <div className="cursor-pointer hover:underline reactText">
            {millify(120000)}
          </div>
        </DrawerModelProvider>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <DrawerModelProvider modelContent={<CommentsModel post={post} />}>
          <div className="reactText flex items-center gap-1">
            <span>{millify(1200)}</span>
            <span className="hidden sm:block">Comments</span>
            <img src={CommentIcon} alt="comment" className="sm:hidden w-5" />
          </div>
        </DrawerModelProvider>
        <div className="reactText flex items-center gap-1">
          <span>{millify(1100)}</span>
          <span className="hidden sm:block">Share</span>
          <img src={ShareIcon} alt="comment" className="sm:hidden w-5" />
        </div>
        <div className="reactText flex items-center gap-1">
          <span>{millify(400)}</span>
          <span className="hidden sm:block">Saved</span>
          <img src={SaveIcon} alt="comment" className="sm:hidden w-5" />
        </div>
      </div>
    </div>
  );
};

export default PostReactions;
