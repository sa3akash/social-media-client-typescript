import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import SingleMessage from "@/components/messanger/item/SingleMessage";
import { Utils } from "@/services/utils/utils";
import { useEffect } from "react";
import { ChatSocket } from "@/services/socket/chatSocket";
import useFetchMessageAll from "@/hooks/useFetchMessageAll";

const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const { messages } = useSelector((state: RootState) => state.messanger);

  const { selectedConversation } = useSelector(
    (state: RootState) => state.messanger
  );

  // const dispatch: AppDispatch = useDispatch();

  // useInfiniteScroll(
  //   `/chat/messagess/${selectedConversation?.conversationId}`,
  //   (data) => {
  //     dispatch(setMessages(data.messages));
  //   }
  // );


  const { messages, addMessage, containerRef, loading } = useFetchMessageAll(selectedConversation?.conversationId as string);


  console.log(loading)


  useEffect(() => {
    selectedConversation &&
      ChatSocket.JoinRoomEmit(
        selectedConversation?.senderId,
        selectedConversation?.receiverId
      );
    return () => {
      ChatSocket.JoinRoomOff();
    };
  }, [selectedConversation]);

  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader />
      <div className="flex-1 flex flex-col justify-end">
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4" ref={containerRef}>
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
              />
            ))}
          </div>
        </ScrollArea>
        <MessangerInput />
      </div>
    </div>
  );
};

export default MessangerBody;
