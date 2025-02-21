import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/services/utils/timeAgo";
import { RootState } from "@/store";
import { AudioWaveform, Check, CheckCheck, File, Video } from "lucide-react";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  item: IMessageData;
  active: boolean;
}

const SingleConversationItem: FC<Props> = ({ item, active }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate()

  const won = user?.authId === item.senderId;

  const getString = () => {
    if (item.gifUrl) {
      return "Send a gif image";
    }
    if (item.files.some((file) => file.mimetype.includes("audio"))) {
      return (
        <>
          <AudioWaveform className="w-4" /> Audio message
        </>
      );
    }
    if (item.files.some((file) => file.mimetype.includes("video"))) {
      return (
        <>
          <Video className="w-4" /> Video message
        </>
      );
    }
    return item.files.length > 0 ? (
      <>
        <File className="w-4" />
       File message
      </>
    ) : (
      item.body
    );
  };

  return (
    <div
      className={cn(
        "flex items-center px-4 gap-2 rounded-md w-full h-[74px] cursor-pointer",
        active ? "bg-[#1E75FF]" : won ? "bg-[#292932]" : "hover:bg-[#292932]"
      )}
      onClick={() => {
        navigate("/messanger"+`?conversationId=${item.conversationId}&receiverId=${item.user.authId}`);
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
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "roboto text-[14px] tracking-[0.1px] text-[#92929D] line-clamp-1 flex items-center gap-2 flex-1",
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
                    "min-w-4 min-h-4",
                    !item.isRead &&
                      !active &&
                      item.senderId !== user?.authId &&
                      "text-[#1E75FF]"
                  )}
                />
              ) : (
                <Check
                  className={cn(
                    "min-w-4 min-h-4",
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
