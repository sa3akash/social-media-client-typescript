import { FollowButton } from "@/components/common/FollowButton";
import UserAvater from "@/components/common/UserAvater";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { LegacyRef, forwardRef } from "react";
import { ReactionIconMap } from "@/services/utils/map";
import UserHoverCard from "@/components/common/UserHoverCard";

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
              <div className="cursor-pointer">
                <div>
                  <UserHoverCard
                    item={{
                      _id: reaction?.creator.authId,
                      ...reaction?.creator,
                    }}
                    className="capitalize font-semibold text-[14px] tracking-[0.1px] h-max"
                  />
                </div>
                <span className="roboto text-[14px] tracking-[0.1px] text-[#696974]">
                  @{reaction.creator.username}
                </span>
              </div>
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
