import Navbar from "@/components/common/Navbar";
import SidebarLeft from "@/components/home/SidebarLeft";
import StoryCard from "@/components/card/StoryCard";
import AddPost from "@/components/post/AddPost";
import AddStory from "@/components/post/AddStory";
import AllPost from "@/components/post/AllPost";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventsCard from "@/components/card/EventsCard";
import SujestedPage from "@/components/card/SujestedPage";
import SujestedFriends from "@/components/card/SujestedFriends";

const Home = () => {
  return (
    <div className="h-full">
      {/* navbar */}
      <div className="h-[70px] md:h-[80px] cardBG border-b">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row md:gap-6 h-full w-full justify-start md:justify-between">
        {/* left side bar */}
        <div className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-[95%] cardBG md:h-full border-b md:border-none">
          <SidebarLeft />
        </div>
        {/* postbar */}
        <div className="max-w-[1000px] h-full w-[100%] flex gap-8">
          <div className="w-full md:max-w-[640px] md:w-[95%] mx-auto h-full">
            <ScrollArea className="h-full w-full">
              <AddPost />
              <AddStory />
              <AllPost />
            </ScrollArea>
          </div>
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
        </div>
        {/* right sidebar */}
        <div className="hidden xl:block max-w-[310px] w-[95%] bg-gray-500 h-full">
          sidebar right
        </div>
      </div>
    </div>
  );
};

export default Home;
