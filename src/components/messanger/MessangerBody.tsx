import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AppDispatch, RootState } from "@/store";
import { setMessages } from "@/store/reducers/MessangerReducer";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SingleMessage from "@/components/messanger/item/SingleMessage";
import { Utils } from "@/services/utils/utils";

const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { messages } = useSelector((state: RootState) => state.messanger);
  const [seatchParams] = useSearchParams();
  const conversationId = seatchParams.get("conversationId");

  const dispatch: AppDispatch = useDispatch();

  const { lastElementRef, loading } = useInfiniteScroll(
    `/chat/messagess/${conversationId}`,
    (data) => {
      dispatch(setMessages(data.messages));
    }
  );

  console.log("loading...", loading);

  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader />
      <div className="flex-1 flex flex-col justify-end">
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
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
                ref={messages.length === index + 1 ? lastElementRef : null}
              />
            ))}
          </div>
        </ScrollArea>
        <MessangerInput conversationId={conversationId}/>
      </div>
    </div>
  );
};

export default MessangerBody;
