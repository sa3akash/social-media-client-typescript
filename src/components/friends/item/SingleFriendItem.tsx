import { FollowButton } from "@/components/common/FollowButton";
import Image from "@/components/common/Image";
import UserAvater from "@/components/common/UserAvater";
import { IUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  item: IUserDoc;
  active: boolean;
}

const SingleFriendItem: React.FC<Props> = ({ item, active }) => {
  return (
    <div className="cardBG relative md:rounded-lg h-full">
      <div className="hidden md:block">
        <Image
          src={item.coverPicture || "/baner.jpg"}
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
            <div>
              <h4 className="font-semibold text-[18px] capitalize">
                {item.name.first} {item.name.last}
              </h4>
              <span className="roboto text-[14px] tracking-[0.1px] text-[#696974]">
                @{item.username}
              </span>
            </div>
            {active ? (
              <FollowButton active={true} text="Following" />
            ) : (
              <FollowButton active={false} text="Follow" />
            )}
          </div>
          <p className="roboto text-[16px] leading-7 tracking-[0.1px] text-[#92929D]">
            {item.quote.length > 70 ? item.quote.slice(0, 70) + "..." : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendItem;
