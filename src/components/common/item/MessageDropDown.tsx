import SingleConversationItem from "@/components/messanger/item/SingleConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import {  useGetConversationQuery } from "@/store/rtk/message/message";
import { useSearchParams } from "react-router-dom";

const MessageDropDown = () => {
  const [seatchParams] = useSearchParams();
  const conversationId = seatchParams.get("conversationId");

 const {data} = useGetConversationQuery('')

  
  return (
    <div
      className={cn(
        "fixed md:max-w-[340px] w-full h-[calc(100%-80px)] top-[80px] right-0 bg-background z-[100] transition-all md:border-l"
      )}
    >
      <ScrollArea className="h-full w-full flex">
        <h3 className="p-4 cardBG text-[#92929D] font-semibold text-[14px] tracking-[1px]">
          Messages
        </h3>
        <div className="flex flex-col gap-2 px-2 py-2">
          {data?.map((item:IMessageData, index:number) => (
            <SingleConversationItem
              key={index}
              item={item}
              active={conversationId === item.conversationId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageDropDown;
