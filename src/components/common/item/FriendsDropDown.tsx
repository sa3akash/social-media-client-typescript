import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const FriendsDropDown = () => {
  return (
    <div
      className={cn(
        "fixed max-w-[340px] w-full h-[calc(100%-80px)] top-[80px] right-0 bg-background z-10 transition-all border-l md:border-l"
      )}
    >
      <ScrollArea className="h-full w-full flex">
        <h3 className="p-4 cardBG text-[#92929D] font-semibold text-[14px] tracking-[1px]">Friends</h3>
        <div>this friends list</div>
      </ScrollArea>
    </div>
  );
};

export default FriendsDropDown;
