import Navbar from "@/components/common/Navbar";
import RightSide from "@/components/home/RightSide";
import SidebarLeft from "@/components/home/SidebarLeft";
import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import { ScrollArea } from "@/components/ui/scroll-area";

const Profile = () => {
  return (
    <div className="h-full">
      <div className="h-[70px] md:h-[80px] cardBG border-b">
        <Navbar />
      </div>
      {/* main  */}
      <div className="flex flex-col md:flex-row md:gap-4 h-full w-full justify-start md:justify-between">
        {/* left sidebar */}
        <div className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-full cardBG md:h-[calc(100%-80px)] border-b md:border-none">
          <SidebarLeft />
        </div>
        <div className="max-w-[1000px] h-full w-full">
          <ScrollArea className="h-[95%] w-full">
            <div className="h-[calc(100%-224px)] w-full">
              <ProfileBar />
              <div className="flex gap-8 w-full h-full mt-2 md:mt-0">
                <CardAreaProfile />
                <ProfilePost />
              </div>
            </div>
          </ScrollArea>
        </div>
        {/* right sidebar */}
        <div className="hidden xl:block max-w-[310px] w-full cardBG h-full border-l">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Profile;
