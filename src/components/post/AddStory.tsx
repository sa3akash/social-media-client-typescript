import { userData } from "@/data/AddStoryData";
import SingleStoryItem from "@/components/post/item/SingleStoryItem";
import { Plus } from "lucide-react";

const AddStory = () => {
  return (
    <div className="h-[100px] w-full cardBG mt-2 flex md:hidden items-center border-b">
      <div className="h-full max-w-[768px] overflow-auto">
        <div className="flex gap-4 px-4 overflow-auto h-full w-full items-center justify-start">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <Plus className="text-[#0062FF]" size={40} />
            </div>
            <span className="font-[500] text-[12px]">Add Story</span>
          </div>
          {userData.slice(0,3).map((data, i) => (
            <SingleStoryItem key={i} item={data} />
          ))}
         
        </div>
      </div>
    </div>
  );
};

export default AddStory;