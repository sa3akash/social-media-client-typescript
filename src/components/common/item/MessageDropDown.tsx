import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const MessageDropDown = () => {
  return (
    <div
      className={cn(
        "fixed md:max-w-[340px] w-full h-[calc(100%-80px)] top-[80px] right-0 bg-background z-10 transition-all"
      )}
    >
      <ScrollArea className="h-full w-full flex">
        <h3 className="p-4 cardBG text-[15px] font-semibold">Notifications</h3>
        <div>this new message</div>
      </ScrollArea>
    </div>
  );
};

export default MessageDropDown;
