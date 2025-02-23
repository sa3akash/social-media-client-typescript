import UserAvater from "@/components/common/UserAvater";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { LegacyRef, forwardRef } from "react";
import { ReactionIconMap } from "@/services/utils/map";
import UserHoverCard from "@/components/common/UserHoverCard";
import { useFollowUserMutation } from "@/store/rtk/friends/friendsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

interface Props {
  reaction: IReactionDoc;
}

const SingleReactionData = forwardRef(
  ({ reaction }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const reactionIcon = ReactionIconMap[
      reaction.type as keyof typeof ReactionIconMap
    ] as string;

    const [followUser] = useFollowUserMutation();
    const { user, following } = useSelector((state: RootState) => state.auth);

    const followingReaction = following.some((id) => id === reaction.authId);
    
    return (
      <div className="w-full h-full" ref={ref} >
        <div className="p-4 flex gap-2">
          <div className="h-full relative">
            <UserAvater
              src={reaction.creator.profilePicture}
              name={reaction.creator.name}
              className="!w-[60px] !h-[60px] object-cover rounded-full border-[4px] border-white"
              avatarColor={reaction.creator.avatarColor}
              authId={reaction?.authId}
              indicator="hidden"
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
              

              <button
                className={cn(
                  "px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all bg-gray-500 hover:bg-gray-500 border-gray-500",
                  followingReaction
                    ? "bg-[#1E75FF] hover:bg-[#1e80ff] border-[#1E75FF]"
                    : "bg-transparent",
                  user?.authId === reaction.authId ? "hidden" : ""

                  
                )}
                onClick={() => followUser(reaction.authId)}
              >
                {followingReaction ? "following" : "follow"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SingleReactionData;
