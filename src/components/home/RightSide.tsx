import RightSideFriends from "@/components/home/items/RightSideFriends";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userData } from "@/data/AddStoryData";
import SearchIcon from "@/assets/images/ic_Search.svg";

const RightSide = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea className="flex-1 w-full">
        <div className="w-full h-full mt-0 mb-4">
          <RightSideFriends type="page" data={userData} title="Your Pages" />
          <RightSideFriends type="friends" data={userData} title="Friends" />
          <RightSideFriends type="groups" data={userData} title="Groups" />
        </div>
      </ScrollArea>

      <div className="px-4 py-4 border-t w-full flex items-center gap-4">
        <img src={SearchIcon} alt="icon" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent select-none text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default RightSide;
