import AllMessages from "@/components/messanger/item/AllMessages";
import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessangerBody = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader />
      <div className="flex-1 flex flex-col justify-end">
        <ScrollArea>
          <AllMessages />
        </ScrollArea>
        <MessangerInput />
      </div>
    </div>
  );
};

export default MessangerBody;
