import SingleMessage from "@/components/messanger/item/SingleMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import useChatAsRead from "@/hooks/socket/useMessageRead";
import useMessageScroll from "@/hooks/testhook/useMessageScroll";
import { IUserDoc } from "@/interfaces/auth.interface";
import { Utils } from "@/services/utils/utils";
import { RootState } from "@/store";
import { Loader2 } from "lucide-react";
import { ElementRef, FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

interface Props {
  selectedUser: IUserDoc;
  conversationId: string;
}

const ModelMessages: FC<Props> = ({ selectedUser,conversationId }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const bottomRef = useRef<ElementRef<"div">>(null);

  const { messages,hasLoadMore,loadMoreMessages,isLoading,isFetching } = useMessageScroll(conversationId!);

  useChatAsRead(messages,conversationId,selectedUser.authId,user!.authId)
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages?.length) {
    return null;
  }

  return (
    <div className="flex-1">
      <ScrollArea className="h-full w-full" id="scrollOverHight">
        <div className="flex flex-col gap-4 h-full px-0 py-4 md:p-4">
          <div className="flex-1"></div>
          {messages?.map((message, index) => (
            <SingleMessage
              item={message}
              wonMessage={user?.authId === message.senderId}
              multipleMessage={
                index > 0 && message.senderId === messages[index - 1].senderId
              }
              separatorDate={
                index > 0 &&
                !Utils.checkDateSame(
                  messages[index - 1].createdAt,
                  message.createdAt
                )
              }
              key={index}
              lastMessage={index + 1 === messages.length}
            />
          ))}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
      {isLoading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
    </div>
  );
};

export default ModelMessages;
