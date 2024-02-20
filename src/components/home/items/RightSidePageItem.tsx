import UserAvater from "@/components/common/UserAvater";
import { IUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  item: IUserDoc;
  active: boolean;
}

const RightSidePageItem: React.FC<Props> = ({ item, active }) => {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer select-none">
      <div className="flex items-center gap-4">
        <UserAvater src={item.profilePicture} name={item.name} avatarColor={item.avatarColor}  authId={item.authId}/>
        <h3 className="capitalize text-[14px] tracking-[0.2px]">{`${item.name.first} ${item.name.last}`}</h3>
      </div>
      <div>
        {active ? (
          <div className="w-[10px] h-[10px] rounded-full bg-[#82C43C]"></div>
        ) : (
          <span className="text-[#92929D] text-[14px] tracking-[0.1px] leading-5">
            11 min
          </span>
        )}
      </div>
    </div>
  );
};

export default RightSidePageItem;
