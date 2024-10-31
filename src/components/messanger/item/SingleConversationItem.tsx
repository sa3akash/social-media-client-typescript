import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/services/utils/timeAgo";
import { RootState } from "@/store";
import { Check, CheckCheck } from "lucide-react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

interface Props {
  item: IMessageData;
  active: boolean;
}

const SingleConversationItem: FC<Props> = ({ item, active }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [, setSearchParams] = useSearchParams();

  const won = user?.authId === item.senderId;

  const getString = () => {
    if (item.body.trim().length > 0) {
      return item.body.length > 35
        ? item.body.substring(0, 35) + " ..."
        : item.body;
    }
    if (item.gifUrl) {
      return "Send a gif image";
    }
    // if (item.audioUrl) {
    //   return 'Send an audio message'
    // }
    // if (item.videoUrl) {
    //   return 'Send a video message'
    // }
    return "Send a file";
  };

  return (
    <div
      className={cn(
        "flex items-center px-4 gap-2 rounded-md w-full h-[74px] cursor-pointer",
        active ? "bg-[#1E75FF]" : won ? "bg-[#292932]" : "hover:bg-[#292932]"
      )}
      onClick={() => {
        // navigate("messanger");
        setSearchParams({
          conversationId: item.conversationId,
          receiverId: item.user.authId,
        });
      }}
    >
      <UserAvater
        src={item.user?.profilePicture}
        name={item.user?.name as NameDoc}
        className="w-[36px] h-[36px] md:w-[36px] md:h-[36px]"
        avatarColor={item.user?.avatarColor}
        authId={item.user?.authId}
        indicator="bottom-5"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[14px] tracking-[0.1px] capitalize">
            {item.user?.name.first} {item.user?.name.last}
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
              !item.isRead && !active && item.senderId !== user?.authId
                ? "text-[#1E75FF] font-bold"
                : "text-[#92929D]",
              active && "text-primary!"
            )}
          >
            {getString()}

            {/* {item.gifUrl ? "Gif" : "Image"} */}
          </span>
          {item.senderId === user?.authId ? (
            <>
              {item.isRead ? (
                <CheckCheck
                  className={cn(
                    "w-5",
                    !item.isRead &&
                      !active &&
                      item.senderId !== user?.authId &&
                      "text-[#1E75FF]"
                  )}
                />
              ) : (
                <Check
                  className={cn(
                    "w-5",
                    !item.isRead &&
                      !active &&
                      item.senderId !== user?.authId &&
                      "text-[#1E75FF]"
                  )}
                />
              )}
            </>
          ) : (
            !item.isRead && (
              <div className="w-[20px] h-[20px] bg-[#1E75FF] rounded-full flex items-center justify-center">
                2
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleConversationItem;
