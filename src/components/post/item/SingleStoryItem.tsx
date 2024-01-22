import Image from "@/components/common/Image";
import { IUserDoc } from "@/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  item: IUserDoc;
}

const SingleStoryItem: React.FC<Props> = ({ item }) => {
  const name =
    item.username?.length > 8
      ? item.username.slice(0, 8) + "..."
      : item.username;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "w-14 h-14 rounded-full overflow-hidden border-[2px]",
          item.avatarColor && `border-[${item.avatarColor}]`
        )}
      >
        <Image src={item.profilePicture} classNameTwo="object-cover" />
      </div>
      <span className="font-[500] text-[12px]">{name}</span>
    </div>
  );
};

export default SingleStoryItem;
