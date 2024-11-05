import React, { FC, useRef, useState } from "react";
import AtachmentIcon from "@/assets/images/ic_file.svg";
import ImojiIcon from "@/assets/images/ic_emoji.svg";
import GifIcon from "@/assets/icons/gifIco.png";
import EmojiPicker from "@/components/common/EmojiPicker";
import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import GiphyPopover from "@/components/common/GiphyPopover";
import { useSearchParams } from "react-router-dom";
import { useSendMessageMutation } from "@/store/rtk/message/message";
import { Mic } from "lucide-react";
import AudioRecorder from "../AudioRecorder";

interface Props {
  setGif: React.Dispatch<React.SetStateAction<string>>;
  gif: string;
}

const MessangerInput: FC<Props> = ({ setGif, gif }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [messageValue, setMessageValue] = useState<string>("");

  const [isAudioRecord, setIsAudioRecord] = useState(false);

  const handlekeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && messageValue.length > 0) {
      sendMessageHandle();
    }
  };

  const [searchParam] = useSearchParams();

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const sendMessageHandle = () => {
    if ((messageValue.length > 0 && user) || gif) {
      const data = {
        body: messageValue,
        receiverId: searchParam.get("receiverId") as string,
        conversationId: searchParam.get("conversationId") as string,
        gifUrl: gif,
      };
      sendMessage(data);
      setMessageValue("");
      setGif("");
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-[82px] bg-[#292932]">
      <div className="p-4 flex items-center h-full gap-2 sm:gap-4 w-full">
        <div className="hidden md:block">
        <UserAvater
          src={user?.profilePicture}
          name={user?.name as NameDoc}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={user?.avatarColor}
          authId={user?.authId}
          indicator="hidden"
        />
        </div>
        {isAudioRecord ? (
          <AudioRecorder />
        ) : (
          <div className="cardBG flex-1 flex items-center justify-between h-full px-2 sm:px-4 rounded-md">
            <input
              type="text"
              className="flex-1 h-full focus:outline-none bg-transparent placeholder:roboto placeholder:text-[#92929D] roboto text-[14px] leading-6 "
              placeholder="Write messages down here…"
              ref={(el) => {
                el?.focus();
                inputRef.current = el;
              }}
              onChange={(e) => setMessageValue(e.target.value as string)}
              value={messageValue}
              onKeyDown={handlekeydown}
              disabled={isLoading}
            />
            <div className="flex items-center gap-2 sm:gap-4 w-max">
              <Mic
                className="min-w-[15px] w-5] dark:invert brightness-50 cursor-pointer hover:brightness-0"
                onClick={() => setIsAudioRecord(true)}
              />
              <GiphyPopover
                fn={(url: string) => {
                  inputRef.current?.focus();
                  setGif(url);
                }}
              >
                <img
                  src={GifIcon}
                  alt="atachIcon"
                  className="min-w-[15px] w-5 icon dark:invert brightness-0"
                />
              </GiphyPopover>
              <img src={AtachmentIcon} alt="atachIcon" className="min-w-[15px] w-5 icon" />
              <EmojiPicker
                onChange={(value: string) =>
                  setMessageValue((prev) => prev + value)
                }
              >
                <img src={ImojiIcon} alt="emojiIcon" className="min-w-[15px] w-5 icon" />
              </EmojiPicker>
            </div>
          </div>
        )}
        <Button onClick={sendMessageHandle} disabled={isLoading}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessangerInput;
