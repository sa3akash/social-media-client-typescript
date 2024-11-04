import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import CallingAudioVideo from "@/components/messanger/item/CallingAudioVideo";
import { ElementRef, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Utils } from "@/services/utils/utils";
import Call from "./call/Call";
import {} from "@/interfaces/auth.interface";
// import useWebrtc from "@/hooks/webrtc/useWebrtc";
import useMessageScroll from "@/hooks/testhook/useMessageScroll";
import { Button } from "@/components/ui/button";
import useChatAsRead from "@/hooks/socket/useMessageRead";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";

const SingleMessage = lazy(
  () => import("@/components/messanger/item/SingleMessage")
);

const MessangerInput = lazy(
  () => import("@/components/messanger/item/MessangerInput")
);
const MessangerHeader = lazy(
  () => import("@/components/messanger/item/MessangerHeader")
);

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

export default MessangerBody;

// id="scrollOverHight"
