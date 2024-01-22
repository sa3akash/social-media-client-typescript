import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import SingleMessangerItem from "./item/SingleMessangerItem";
import { messageData } from "@/data/MessageData";

const MessangerSidebar = () => {
  return (
    <div className="w-full h-full ">
      <ScrollArea className="w-full h-[calc(100%-80px)]">
      <div className="py-4 px-4 flex items-center justify-between">
        <h4 className="text-[18px] font-semibold leading-6 tracking-[0.1px]">Message</h4>
        <Button className="">New</Button>
      </div>
      <div className="flex flex-col gap-2 px-2 py-2">
        {messageData.map((item,index)=>(
          <SingleMessangerItem key={index} item={item}/>
        ))}
      </div>
      </ScrollArea>
    </div>
  );
};

export default MessangerSidebar;
