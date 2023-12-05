import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import { ScrollArea } from "@/components/ui/scroll-area";

const Profile = () => {
  return (
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
  );
};

export default Profile;
