import { FollowButton } from "@/components/common/FollowButton";
import Image from "@/components/common/Image";
import UserAvater from "@/components/common/UserAvater";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import React, { LegacyRef } from "react";
import DefaultCover from "@/assets/defaultCover.jpg";
import UserHoverCard from "@/components/common/UserHoverCard";

interface Props {
  item: IFollowerDoc;
  active: boolean;
}

const SingleFriendItem = React.forwardRef(
  ({ item, active }: Props, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div className="cardBG relative md:rounded-lg h-full" ref={ref}>
        <div className="hidden md:block select-none">
          <Image
            src={item.coverPicture || DefaultCover}
            className="w-full h-[110px] object-cover"
          />
        </div>
        <div className="p-4 flex gap-2">
          <div className="h-full w-[60px] md:w-[90px]">
            <UserAvater
              src={item.profilePicture}
              name={item.name}
              className="md:absolute md:top-20 z-20 !w-[60px] !h-[60px] md:!w-[90px] md:!h-[90px] object-cover rounded-full border-[4px] border-white"
              avatarColor={item.avatarColor}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <UserHoverCard item={item} />{" "}
                <span className="roboto text-[14px] tracking-[0.1px] text-[#696974]">
                  @{item.username}
                </span>
              </div>
              <FollowButton active={active} text="Following" />
            </div>
            <p className="roboto text-[16px] leading-7 tracking-[0.1px] text-[#92929D]">
              {item.quote.length > 70
                ? item.quote.slice(0, 70) + "..."
                : "" ||
                  "“Pushing pixels and experiences in digital products for Sebostudio”"}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default SingleFriendItem;
