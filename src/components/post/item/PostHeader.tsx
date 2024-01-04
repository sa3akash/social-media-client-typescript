import React, { useRef } from "react";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { cn } from "@/lib/utils";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import PostHeaderModel from "@/components/post/item/PostHeaderModel";
import UserAvater from "@/components/common/UserAvater";
import { Link } from "react-router-dom";
import { timeAgo } from "@/services/utils/timeAgo";
import { ICreator, IFeelings } from "@/interfaces/post.interface";
import { feelingIconMap } from "@/services/utils/map";

interface Props {
  user: ICreator;
  createAt: string;
  feelings?: string;
}

const PostHeader: React.FC<Props> = ({ user, createAt, feelings }) => {
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
            <Link
              to={`/u/${user.authId}`}
              className="capitalize font-semibold text-[14px] tracking-[0.1px]"
            >{`${user.name.first} ${user.name.last}`}</Link>
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
      <div
        className={cn(
          "w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none",
          openModel && "borderColor"
        )}
        onClick={() => setOpenModel((prev) => !prev)}
        ref={docRef}
      >
        <img src={MoreDot} alt="dot" />
        {openModel && <PostHeaderModel />}
      </div>
    </div>
  );
};

export default PostHeader;
