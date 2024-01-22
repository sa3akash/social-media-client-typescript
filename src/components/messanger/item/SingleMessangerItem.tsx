import UserAvater from "@/components/common/UserAvater";
import { IMessageData } from "@/data/MessageData";
import { NameDoc } from "@/interfaces/auth.interface";
// import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/services/utils/timeAgo";
import { FC } from "react";

interface Props {
  item: IMessageData;
}

const SingleMessangerItem: FC<Props> = ({ item }) => {
  //   const { user } = useSelector((state: RootState) => state.auth);

  const active = false;
  const won = true;

  return (
    <div
      className={cn(
        "flex items-center px-4 gap-2 rounded-md w-full h-[74px] cursor-pointer",
        active ? "bg-[#1E75FF]" : won ? "bg-[#292932]" : ""
      )}
    >
      <UserAvater
        src={item?.receiverObject.profilePicture}
        name={item?.receiverObject.name as NameDoc}
        className="min-w-[36px] min-h-[36px]"
        avatarColor={item?.receiverObject.avatarColor}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {item?.receiverObject.name.first} {item?.receiverObject.name.last}
          </h4>
          <span
            className={cn(
              "roboto text-[12px] font-normal leading-5",
              active ? "text-primary" : "text-[#92929D]"
            )}
          >
            {timeAgo.chatMessageTransform(item.createdAt)}
          </span>
        </div>
        <div>
          <span
            className={cn(
              "roboto text-[14px] tracking-[0.1px] text-[#92929D]",
              active ? "text-primary" : "text-[#92929D]"
            )}
          >
            {item?.body}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleMessangerItem;
