import { ScrollArea } from "@/components/ui/scroll-area";
import StoryCard from "@/components/card/StoryCard";
import EventsCard from "@/components/card/EventsCard";
import SujestedFriends from "@/components/card/SujestedFriends";
import SujestedPage from "@/components/card/SujestedPage";

const CardArea = () => {
  return (
    <section className="hidden 2xl:flex flex-col max-w-[340px] w-[95%]">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-4 mt-6">
          <StoryCard />
          <EventsCard />
          <SujestedFriends />
          <SujestedPage />
        </div>
      </ScrollArea>
    </section>
  );
};

export default CardArea;
