import { ScrollArea } from "@/components/ui/scroll-area";
import StoryCard from "@/components/card/StoryCard";
import EventsCard from "@/components/card/EventsCard";
import SujestedFriends from "@/components/card/SujestedFriends";
import SujestedPage from "@/components/card/SujestedPage";

const CardArea = () => {
  return (
    <div className="hidden 2xl:flex flex-col max-w-[340px] w-[95%] mt-6 ">
      <ScrollArea className="h-[95%] w-full">
        <div className="flex flex-col gap-4 mb-12">
          <StoryCard />
          <EventsCard />
          <SujestedFriends />
          <SujestedPage />
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardArea;
