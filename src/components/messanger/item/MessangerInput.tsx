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
import SelectFiles from "./SelectFiles";
import { useUploadSingleFileMutation } from "@/store/rtk/upload/upload";
import { IMessageFile } from "@/interfaces/chat.interface";

interface Props {
  setGif: React.Dispatch<React.SetStateAction<string>>;
  gif: string;
  scrollToBottom: () => void;
}

export const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const MessangerInput: FC<Props> = ({ setGif, gif, scrollToBottom }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [messageValue, setMessageValue] = useState<string>("");

  const [isAudioRecord, setIsAudioRecord] = useState(false);
  const [voiceAudio, setVoiceAudio] = useState<File | null>(null);

  const [openSelectedModel, setOpenSelectedModel] = useState(false);

  const [uploadSingleFile, { isLoading: isFetching }] =
    useUploadSingleFileMutation();

  const handlekeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && messageValue.length > 0) {
      sendMessageHandle();
    }
  };

  const [searchParam] = useSearchParams();

  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const conversationId = searchParam.get("conversationId") as string;
  const receiverId = searchParam.get("receiverId") as string;

  const sendMessageHandle = async () => {
    if (voiceAudio) {
      await uploadFile(voiceAudio);
    } else {
      if ((messageValue.length > 0 && user) || gif) {
        const data = {
          body: messageValue,
          receiverId: receiverId,
          conversationId: conversationId,
          gifUrl: gif,
          files: [] as IMessageFile[],
        };

        await sendMessage(data);
        setMessageValue("");
        setGif("");
        setVoiceAudio(null);
        setIsAudioRecord(false);
        scrollToBottom();
      }
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (file: File) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    // Sequentially upload chunks of the file
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      // Wait for each chunk to be uploaded before proceeding to the next
      await uploadChunk(chunk, file, chunkIndex, totalChunks);
    }
  };

  // Upload a single chunk
  const uploadChunk = async (
    chunk: Blob,
    file: File,
    chunkIndex: number,
    totalChunks: number
  ) => {
    const params = new URLSearchParams({
      name: file.name,
      size: `${file.size}`,
      currentChunkIndex: `${chunkIndex}`,
      totalChunks: `${totalChunks}`,
      type: `${file.type || "audio/wav"}`,
    });

    const data = await readChunkAsDataURL(chunk);

    try {
      const result = await uploadSingleFile({
        data: data,
        params: params.toString(),
      }).unwrap();

      if (result.mimetype) {
        const data = {
          body: "",
          receiverId: receiverId,
          conversationId: conversationId,
          gifUrl: "",
          files: [result],
        };
      await sendMessage(data);
      setMessageValue("");
      setGif("");
      setVoiceAudio(null);
      setIsAudioRecord(false);
      scrollToBottom();
      }
    } catch (err) {
      console.error("Error uploading chunk", err);
    }
  };

  // Convert chunk to base64 data URL
  const readChunkAsDataURL = (chunk: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(chunk);
    });
  };

  return (
    <>
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
            <AudioRecorder
              setIsAudioRecord={setIsAudioRecord}
              setVoiceAudio={setVoiceAudio}
            />
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
                <img
                  src={AtachmentIcon}
                  onClick={() => setOpenSelectedModel(true)}
                  alt="atachIcon"
                  className="min-w-[15px] w-5 icon"
                />
                <EmojiPicker
                  onChange={(value: string) =>
                    setMessageValue((prev) => prev + value)
                  }
                >
                  <img
                    src={ImojiIcon}
                    alt="emojiIcon"
                    className="min-w-[15px] w-5 icon"
                  />
                </EmojiPicker>
              </div>
            </div>
          )}
          <Button
            onClick={sendMessageHandle}
            disabled={isLoading || isFetching}
          >
            Send
          </Button>
        </div>
      </div>

      {openSelectedModel && (
        <SelectFiles
          setOpenSelectedModel={setOpenSelectedModel}
          conversationId={conversationId}
          receiverId={receiverId}
        />
      )}
    </>
  );
};

export default MessangerInput;
