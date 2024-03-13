import MessageImageShow from "@/components/messanger/item/MessageImageShow";
import UserAvater from "@/components/common/UserAvater";
import { Separator } from "@/components/ui/separator";
import { NameDoc } from "@/interfaces/auth.interface";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/services/utils/timeAgo";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FC } from "react";
import { Check, CheckCheck } from "lucide-react";
// import AudioWaveform from "@/components/common/AudioWaveform";

interface Props {
  item: IMessageData;
  wonMessage: boolean;
  multipleMessage: boolean;
  separatorDate: boolean;
  lastMessage: boolean;
}

const SingleMessage: FC<Props> = ({
  item,
  wonMessage,
  multipleMessage,
  separatorDate,
  lastMessage,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {separatorDate && (
        <div className="flex items-center justify-center w-full">
          <Separator />
          <p className="min-w-[180px] text-[16px] text-center text-[#B5B5BE] tracking-[0.1px]">
            {timeAgo.chatSeparatorTransform(item.createdAt)}
          </p>
          <Separator />
        </div>
      )}
      <div
        className={cn(
          "relative flex px-8 gap-2",
          wonMessage ? "flex-row-reverse" : "flex-row",
          multipleMessage ? "-mt-3" : ""
        )}
      >
        <div className="flex flex-col gap-0">
          <div className="px-4 py-3 bg-[#292932] rounded-2xl">
            <div
              className={cn(
                "w-10 h-10 rounded-full absolute top-1 border-[4px] border-transparent cardBG items-center justify-center",
                wonMessage ? "right-1" : "left-1",
                multipleMessage ? "hidden" : "flex"
              )}
            >
              <UserAvater
                name={
                  wonMessage
                    ? (user?.name as NameDoc)
                    : (item.user?.name as NameDoc)
                }
                src={
                  wonMessage ? user?.profilePicture : item.user.profilePicture
                }
                className="!w-[32px] !h-[32px]"
                fallbackClassName="text-[12px]"
                indicator="hidden"
                avatarColor={
                  wonMessage ? user?.avatarColor : item.user.avatarColor
                }
                authId={item.user?.authId}
              />
            </div>
            <p className="roboto text-[14px] text-[#E2E2EA] leading-7 tracking-[0.1px]">
              {item.body}
            </p>
          </div>
          {item.files.length > 0 && (
            <div className="grid gap-1 grid-cols-1 lg:grid-cols-3">
              {item.files.map((f, i) => (
                <MessageImageShow file={f} key={i} />
              ))}
            </div>
          )}

          {item.gifUrl && (
            <img src={item.gifUrl} className="h-[200px] rounded-lg" />
          )}

          {/* <AudioWaveform audioUrl={"/audio.mp3"} /> */}
          {lastMessage && item.senderId === user?.authId && (
            <div className="text-sm flex justify-end">
              {item.isRead ? (
                <CheckCheck className="w-5" />
                ) : (
                  <Check className="w-5" />
                )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "text-[#92929D] roboto text-[12px] min-w-[100px] mt-4",
            wonMessage ? "text-end" : ""
          )}
        >
          {timeAgo.transform(item.createdAt)}
        </div>
      </div>
    </>
  );
};

export default SingleMessage;

// bg-[#292932]
// 44444F
