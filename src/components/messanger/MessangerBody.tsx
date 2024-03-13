import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import SingleMessage from "@/components/messanger/item/SingleMessage";
import { Utils } from "@/services/utils/utils";
import { useEffect, useRef, useState } from "react";
import mainApi from "@/services/http";
import { setMessages } from "@/store/reducers/MessangerReducer";
import { useSocket } from "@/hooks/useSocket";

const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages, selectedConversation } = useSelector(
    (state: RootState) => state.messanger
  );

  const [loading, setLoading] = useState(false);

  const simpleRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    mainApi
      .get(`/chat/messagess/${selectedConversation?.conversationId}?page=${1}`)
      .then(({ data }) => {
        dispatch(setMessages(data.messages));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch, selectedConversation?.conversationId]);

  useEffect(() => {
    simpleRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const otherMessage =
      messages.length &&
      messages[messages.length - 1].senderId !== user?.authId;
    if (otherMessage) {
      socket?.emit("markAsMessage", {
        conversationId: selectedConversation?.conversationId,
        messageSenderId: selectedConversation?.user.authId,
        messageSeenId: user?.authId,
      });
    }
  }, [
    messages,
    selectedConversation?.conversationId,
    selectedConversation?.user.authId,
    socket,
    user?.authId,
  ]);

  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader />
      <div className="flex-1 flex flex-col h-full w-full justify-end">
        <ScrollArea className="">
          <div className="flex flex-col gap-4 h-full p-4">
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
          </div>
          <div ref={simpleRef}></div>
        </ScrollArea>
      </div>
      <MessangerInput />
    </div>
  );
};

export default MessangerBody;
