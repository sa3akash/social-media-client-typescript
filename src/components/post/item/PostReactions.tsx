import millify from "millify";
import CommentIcon from "@/assets/images/ic_comment.svg";
import ShareIcon from "@/assets/images/ic_Share.svg";
import SaveIcon from "@/assets/images/ic_Saved2.svg";
import DrawerModelProvider from "@/components/providers/DrawerModelProvider";
import ReactionModel from "@/components/models/ReactionModel";
import CommentsModel from "@/components/models/CommentsModel";
import React from "react";
import { IPostDoc } from "@/interfaces/post.interface";
import { PostUtils } from "@/services/utils/postUtils";
import { OnlyReactionName } from "@/interfaces/reaction.interface";
import { ReactionIconMap } from "@/services/utils/map";
import ActionTolltip from "@/components/common/ActionTolltip";
import ReactionHover from "@/components/post/item/ReactionHover";

interface Props {
  post: IPostDoc;
}

const PostReactions: React.FC<Props> = ({ post }) => {
  const filersReactions = PostUtils.filterReactions(post.reactions, 3);

  return (
    <div className="px-4 h-[55px] flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {filersReactions.map((r, i) => (
            <DrawerModelProvider
              modelContent={
                <ReactionModel
                  post={post}
                  reactionType={r[0] as OnlyReactionName}
                />
              }
              key={i}
            >
              <div>
                <ActionTolltip
                  label={r[0]}
                  content={
                    <ReactionHover
                      numberOfPost={PostUtils.sumAllReactions(post.reactions)}
                      reactionType={r[0] as OnlyReactionName}
                      postId={post._id}
                    />
                  }
                >
                  <img
                    src={ReactionIconMap[r[0] as OnlyReactionName]}
                    alt="like"
                    className="w-5 cursor-pointer"
                  />
                </ActionTolltip>
              </div>
            </DrawerModelProvider>
          ))}
        </div>
        <DrawerModelProvider
          modelContent={<ReactionModel post={post} reactionType="all" />}
        >
          <div className="cursor-pointer hover:underline reactText">
            {PostUtils.sumAllReactions(post.reactions) > 0 &&
              millify(PostUtils.sumAllReactions(post.reactions))}
          </div>
        </DrawerModelProvider>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <DrawerModelProvider
          modelContent={<CommentsModel postId={post?._id} />}
        >
          <div className="reactText flex items-center gap-1">
            <ActionTolltip
              label="Comments"
              content={
                <ReactionHover
                  numberOfPost={PostUtils.sumAllReactions(post.reactions)}
                  postId={post._id}
                  comment={true}
                />
              }
            >
              <div className="flex items-center gap-1">
                <span>{millify(post.commentsCount)}</span>
                <span className="hidden sm:block">Comments</span>
                <img
                  src={CommentIcon}
                  alt="comment"
                  className="sm:hidden w-5"
                />
              </div>
            </ActionTolltip>
          </div>
        </DrawerModelProvider>
        <div className="reactText flex items-center gap-1">
          <span>{millify(1)}</span>
          <span className="hidden sm:block">Share</span>
          <img src={ShareIcon} alt="comment" className="sm:hidden w-5" />
        </div>
        <div className="reactText flex items-center gap-1">
          <span>{millify(0)}</span>
          <span className="hidden sm:block">Saved</span>
          <img src={SaveIcon} alt="comment" className="sm:hidden w-5" />
        </div>
      </div>
    </div>
  );
};

export default PostReactions;
{
  /* <div>
                <ActionTolltip
                  label={r[0]}
                  content={
                    <CommentAndReactionHover
                      numberOfPost={PostUtils.sumAllReactions(post.reactions)}
                      reactionType={r[0] as OnlyReactionName}
                      postId={post._id}
                    />
                  }
                >
                  <img
                    src={ReactionIconMap[r[0] as OnlyReactionName]}
                    alt="like"
                    className="w-5 cursor-pointer"
                  />
                </ActionTolltip>
              </div> */
}
