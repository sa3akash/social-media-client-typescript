import { FollowButton } from "@/components/common/FollowButton";
import UserAvater from "@/components/common/UserAvater";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { LegacyRef, forwardRef } from "react";
import { ReactionIconMap } from "@/services/utils/map";
import { Link } from "react-router-dom";

interface Props {
  reaction: IReactionDoc;
  active: boolean;
}

const SingleReactionData = forwardRef(
  ({ reaction, active }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const reactionIcon = ReactionIconMap[
      reaction.type as keyof typeof ReactionIconMap
    ] as string;

    return (
      <div className="w-full h-full" ref={ref}>
        <div className="p-4 flex gap-2">
          <div className="h-full relative">
            <UserAvater
              src={reaction.creator.profilePicture}
              name={reaction.creator.name}
              className="!w-[60px] !h-[60px] object-cover rounded-full border-[4px] border-white"
              avatarColor={reaction.creator.avatarColor}
            />
            <img
              src={reactionIcon}
              alt={reaction.type}
              className="w-5 h-5 absolute right-0 bottom-0"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Link to={`/u/${reaction.authId}`} className="cursor-pointer">
                <h4 className="font-semibold text-[18px] capitalize">
                  {reaction.creator.name.first} {reaction.creator.name.last}
                </h4>
                <span className="roboto text-[14px] tracking-[0.1px] text-[#696974]">
                  @{reaction.creator.username}
                </span>
              </Link>
              {active ? (
                <FollowButton active={true} text="Following" />
              ) : (
                <FollowButton active={false} text="Follow" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SingleReactionData;
