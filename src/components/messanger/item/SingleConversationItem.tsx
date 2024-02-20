import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/services/utils/timeAgo";
import { AppDispatch, RootState } from "@/store";
import { setSelectedConversation } from "@/store/reducers/MessangerReducer";
import { Check, CheckCheck } from "lucide-react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

interface Props {
  item: IMessageData;
  active: boolean;
}

const SingleConversationItem: FC<Props> = ({ item, active }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const [, setSearchParams] = useSearchParams();

  const won = user?.authId === item.senderId;
  const dispatch: AppDispatch = useDispatch();

  const userFriend =
    user?.authId !== item.senderId ? item.senderObject : item.receiverObject;

  return (
    <div
      className={cn(
        "flex items-center px-4 gap-2 rounded-md w-full h-[74px] cursor-pointer",
        active ? "bg-[#1E75FF]" : won ? "bg-[#292932]" : "hover:bg-[#292932]",
        user?.authId !== item.senderId
          ? "border-r-2 border-[#1E75FF]"
          : "border-r-2 border-transparent"
      )}
      onClick={() => {
        // setSearchParams({ conversationId: item.conversationId })
        const data = {
          _id: item._id,
          body: item.body,
          isRead: item.isRead,
          senderId: user?.authId,
          receiverId: userFriend.authId,
          receiverObject: userFriend,
          conversationId: item.conversationId,
        };

        dispatch(setSelectedConversation(data as IMessageData));

      }}
    >
      <UserAvater
        src={userFriend?.profilePicture}
        name={userFriend?.name as NameDoc}
        className="w-[36px] h-[36px] md:w-[36px] md:h-[36px]"
        avatarColor={userFriend?.avatarColor}
        authId={userFriend?.authId}
        indicator="bottom-5"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {userFriend?.name.first} {userFriend?.name.last}
          </h4>
          <span
            className={cn(
              "roboto text-[12px] font-normal leading-5",
              active ? "text-primary" : "text-[#92929D]"
            )}
          >
            {timeAgo.chatMessageTransform(`${item.createdAt}`)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "roboto text-[14px] tracking-[0.1px] text-[#92929D]",
              active ? "text-primary" : "text-[#92929D]"
            )}
          >
            {item?.body.length > 25
              ? item.body.substring(0, 25) + "..."
              : item.body}
          </span>
          {item.isRead ? (
            <CheckCheck className="w-5" />
          ) : (
            <Check className="w-5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleConversationItem;
