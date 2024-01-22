import UserProfile from "@/components/home/items/UserProfile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageURL } from "@/services/utils/pageUrl";
import { SingleLeftItem } from "@/components/home/items/SingleLeftItem";
import { leftSidebarIconMap } from "@/services/utils/map";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { sidebarLeftPage } from "@/data/SidebarLeftData";
import SingleLeftPageItem from "@/components/home/items/SingleLeftPageItem";

const SidebarLeft = () => {
  const { notifications } = useSelector(
    (store: RootState) => store.notification
  );

  return (
    <div className="w-full h-full">
      <ScrollArea className="w-full h-full flex items-center">
        <UserProfile />
        <div className="flex md:flex-col gap-2 mt-[11px] md:mt-0 mx-4 md:mx-0">
          <SingleLeftItem
            imageUrl={leftSidebarIconMap.feed}
            title={PageURL.Feed}
          />
          <SingleLeftItem
            imageUrl={leftSidebarIconMap.friends}
            title={PageURL.FRIENDS}
          />
          <SingleLeftItem
            imageUrl={leftSidebarIconMap.photos}
            title={PageURL.Photos}
          />
          <SingleLeftItem
            imageUrl={leftSidebarIconMap.Messanger}
            title={PageURL.Messanger}
          />

          <SingleLeftItem
            imageUrl={leftSidebarIconMap.videos}
            title={PageURL.WatchVideos}
          />

          <div className="hidden md:block">
            <SingleLeftItem
              imageUrl={leftSidebarIconMap.events}
              title={PageURL.Events}
            />
          </div>
          <div className="hidden md:block">
            <SingleLeftItem
              imageUrl={leftSidebarIconMap.marketplace}
              title={PageURL.Marketplace}
            />
          </div>

          <SingleLeftItem
            imageUrl={
              notifications.some((n) => !n.read)
                ? leftSidebarIconMap.notifications
                : leftSidebarIconMap.notificationOff
            }
            title={PageURL.Notification}
          />
        </div>
        <div className="w-full pt-4 lg:pt-0 border-t lg:border-none flex-col gap-2 hidden md:flex">
          <h3 className="uppercase font-semibold text-[13px] tracking-[0.87px] ml-6 mt-8 mb-2 hidden lg:block">
            pages you like
          </h3>
          {sidebarLeftPage.map((item, i) => (
            <SingleLeftPageItem key={i} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarLeft;

