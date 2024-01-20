import React, { useRef } from "react";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { cn } from "@/lib/utils";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import PostHeaderModel from "@/components/post/item/PostHeaderModel";
import UserAvater from "@/components/common/UserAvater";
import { timeAgo } from "@/services/utils/timeAgo";
import { IFeelings, IPostDoc } from "@/interfaces/post.interface";
import { feelingIconMap } from "@/services/utils/map";
import UserHoverCard from "@/components/common/UserHoverCard";
import { IUserDoc } from "@/interfaces/auth.interface";

interface Props {
  user: IUserDoc;
  createAt: string;
  feelings?: string;
  post: IPostDoc;
}

const PostHeader: React.FC<Props> = ({ user, createAt, feelings, post }) => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);

  return (
    <div className="p-4 flex items-center justify-between gap-4 relative overflow-visible">
      <div className="flex items-center gap-2">
        <UserAvater
          src={user.profilePicture}
          name={user.name}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={user?.avatarColor}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
          <UserHoverCard
                item={{_id: user.authId, ...user}}
                className="capitalize font-semibold text-[14px] tracking-[0.1px] h-max"
              />

            {feelings && (
              <span className="lowercase text-[14px] font-normal flex items-center gap-1">
                is feeling
                <img
                  src={feelingIconMap[feelings as IFeelings]}
                  alt={feelings}
                  className="w-6"
                />
                {feelings}
              </span>
            )}
          </div>
          <span className="text-[12px] roboto text-[#696974]">
            {timeAgo.transform(createAt)}
          </span>
        </div>
      </div>
      <div ref={docRef}>
        <img
          src={MoreDot}
          alt="dot"
          className={cn(
            "rounded-full grid place-items-center cursor-pointer select-none p-2",
            openModel && "borderColor"
          )}
          onClick={() => setOpenModel((prev) => !prev)}
        />
        {openModel && (
          <PostHeaderModel post={post} setOpenModel={setOpenModel} />
        )}
      </div>
    </div>
  );
};

export default PostHeader;
