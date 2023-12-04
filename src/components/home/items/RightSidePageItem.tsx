import Image from "@/components/common/Image";
import { IUserDoc } from "@/data/AddStoryData";
import React from "react";

interface Props {
  item: IUserDoc;
  active: boolean;
}

const RightSidePageItem: React.FC<Props> = ({ item, active }) => {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer select-none">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image src={item.profilePicture} />
        </div>
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
