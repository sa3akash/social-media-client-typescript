import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Loader2, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Utils } from "@/services/utils/utils";
import Call from "./call/Call";
import {} from "@/interfaces/auth.interface";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";
import { useChat } from "@/hooks/chat/useChat";

import SingleMessage from "@/components/messanger/item/SingleMessage";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import useChatAsRead from "@/hooks/socket/useMessageRead";

const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedUser } = useSelector((state: RootState) => state.model);
  const [gif, setGif] = useState<string>("");
  const { isCalling } = useSimplePeer();

  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const receiverId = searchParams.get("receiverId");

  const { chatContainerRef, messages, isLoading, scrollToBottom } =
    useChat(conversationId);

  useChatAsRead(messages, conversationId!, receiverId!, user!.authId);

  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader
        userFriend={selectedUser?.user || messages[0]?.user}
        conversationId={conversationId}
      />
      <div className="flex-1 flex flex-col h-full 2xl:flex-row gap-4">
        {isCalling && (
          <div className="flex-1">
            <Call />
          </div>
        )}
        <div className="flex-1 border flex flex-col">
          <div className="flex-1"></div>

          <div
            className="relative h-full overflow-y-scroll"
            ref={chatContainerRef}
            id="chat-container"
          >
            {isLoading && (
              <div className="w-full flex items-center gap-2 justify-center py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </div>
            )}
            <div className="h-auto"></div>

            {messages.map((message, index) => (
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

            {gif && (
              <div className="absolute bottom-0 left-0 w-full h-[150px]">
                <div className="w-[150px] h-full relative group">
                  <img
                    src={gif}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <X
                    className="w-5 h-5 absolute top-2 right-2 cursor-pointer z-10 hidden group-hover:block transition-all"
                    onClick={() => setGif("")}
                  />
                </div>
              </div>
            )}
          </div>

          <MessangerInput
            setGif={setGif}
            gif={gif}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
    </div>
  );
};

export default MessangerBody;

// id="scrollOverHight"

{
  /**
  const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedUser } = useSelector((state: RootState) => state.model);


  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const receiverId = searchParams.get("receiverId");

  const { messages, hasLoadMore, loadMoreMessages, isLoading, isFetching } =
    useMessageScroll(conversationId!);

  const { isCalling } = useSimplePeer();


  const [gif, setGif] = useState<string>("");

  // const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMoreLoad = () => {
    if (isLoading || isFetching) return;
    loadMoreMessages();
  };

  useChatAsRead(messages, conversationId!, receiverId!, user!.authId);

  if (isLoading || isFetching) return;

  return (
    <div className="flex flex-col w-full h-full">
      <Suspense>
        <MessangerHeader
          userFriend={selectedUser?.user || messages[0]?.user}
          conversationId={conversationId}
        />
      </Suspense>
      <div className="flex-1 flex flex-col h-full 2xl:flex-row gap-4">
         {isCalling && (
          <div className="flex-1">
            <Call />
          </div>
        )} 
        <div className="flex-1 border flex flex-col">
          <div className="flex-1 relative h-full ">
            <ScrollArea className="h-full w-full px-4">
              {hasLoadMore && (
                <div className="text-center py-4">
                  <Button onClick={handleMoreLoad}>
                    Load previous messages
                  </Button>
                </div>
              )}
              {messages.map((message, index) => (
                <Suspense key={index}>
                <SingleMessage
                  item={message}
                  wonMessage={user?.authId === message.senderId}
                  multipleMessage={
                    index > 0 &&
                    message.senderId === messages[index - 1].senderId
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
                </Suspense>
              ))}
              <div ref={bottomRef} />
            </ScrollArea>

            {gif && (
              <div className="absolute bottom-0 left-0 w-full h-[150px]">
                <div className="w-[150px] h-full relative group">
                  <img
                    src={gif}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <X
                    className="w-5 h-5 absolute top-2 right-2 cursor-pointer z-10 hidden group-hover:block transition-all"
                    onClick={() => setGif("")}
                  />
                </div>
              </div>
            )}
          </div>

          <Suspense>
          <MessangerInput setGif={setGif} gif={gif} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
  
  */
}
