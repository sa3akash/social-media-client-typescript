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
import { api } from "@/services/http/api";
import { useToast } from "@/components/ui/use-toast";
import GiphyPopover from "@/components/common/GiphyPopover";

interface Props {}

const MessangerInput: FC<Props> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedConversation } = useSelector(
    (state: RootState) => state.messanger
  );

  const [giphyUrl, setGiphyUrl] = useState("");

  const [messageValue, setMessageValue] = useState<string>("");

  const handlekeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && messageValue.length > 0) {
      sendMessage();
    }
  };

  const { toast } = useToast();

  const sendMessage = () => {
    if (messageValue.length > 0) {
      api.sendMessageJsonCall(
        {
          body: messageValue,
          receiverId: selectedConversation?.receiverId as string,
          conversationId: selectedConversation?.conversationId,
          gifUrl: selectedConversation?.gifUrl,
        },
        toast
      );
    }
    setMessageValue("");
    setGiphyUrl("");
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="min-h-[82px] bg-[#292932]">
      <div className="px-4 py-4 flex items-center h-full gap-4 w-full">
        <UserAvater
          src={user?.profilePicture}
          name={user?.name as NameDoc}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={user?.avatarColor}
          authId={user?.authId}
          indicator="hidden"
        />
        <div className="cardBG flex-1 flex items-center justify-between px-4 py-2 rounded-md">
          <input
            type="text"
            className="w-full focus:outline-none bg-transparent placeholder:roboto placeholder:text-[#92929D] roboto text-[14px] leading-6 "
            placeholder="Write messages down here…"
            ref={inputRef}
            onChange={(e) => setMessageValue(e.target.value as string)}
            value={messageValue}
            onKeyDown={handlekeydown}
          />
          <div className="flex items-center gap-4">
            <GiphyPopover
              fn={(url: string) => {
                inputRef.current?.focus();
                setGiphyUrl(url);
              }}
            >
              <img
                src={GifIcon}
                alt="atachIcon"
                className="w-5 icon invert brightness-0"
              />
            </GiphyPopover>
            <img src={AtachmentIcon} alt="atachIcon" className="w-5 icon" />
            <EmojiPicker
              onChange={(value: string) =>
                setMessageValue((prev) => prev + value)
              }
            >
              <img src={ImojiIcon} alt="emojiIcon" className="w-5 icon" />
            </EmojiPicker>
          </div>
        </div>
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default MessangerInput;
