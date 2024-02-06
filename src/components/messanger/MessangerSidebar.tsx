import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleConversationItem from "@/components/messanger/item/SingleConversationItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FC } from "react";

interface Props {
  conversationId: string | null;
}

const MessangerSidebar:FC<Props> = ({conversationId}) => {
  const { conversations } = useSelector((state: RootState) => state.messanger);

  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-[calc(100%-80px)]">
        <div className="py-4 px-4 flex items-center justify-between">
          <h4 className="text-[18px] font-semibold leading-6 tracking-[0.1px]">
            Message
          </h4>
          <Button className="">New</Button>
        </div>
        <div className="flex flex-col gap-2 px-2 py-2">
          {conversations?.map((item, index) => (
            <SingleConversationItem key={index} item={item} active={conversationId === item.conversationId}/>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessangerSidebar;
