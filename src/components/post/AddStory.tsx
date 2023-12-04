// import React from "react";
import { userData } from "@/data/AddStoryData";
import SingleStoryItem from "./item/SingleStoryItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

const AddStory = () => {
  return (
    <div className="h-[100px] w-full cardBG mt-2 flex md:hidden items-center border-b">
      <ScrollArea className="whitespace-nowrap w-full">
        <div className="flex gap-4 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <Plus className="text-[#0062FF]" size={40} />
            </div>
            <span className="font-[500] text-[12px]">Add Story</span>
          </div>
          {userData.map((data, i) => (
            <SingleStoryItem key={i} item={data} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden"/>
      </ScrollArea>
    </div>
  );
};

export default AddStory;
