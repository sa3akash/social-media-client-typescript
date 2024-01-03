import UserProfile from "@/components/home/items/UserProfile";
import { sidebarLeft, sidebarLeftPage } from "@/data/SidebarLeftData";
import { SingleLeftItem } from "@/components/home/items/SingleLeftItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import SingleLeftPageItem from "@/components/home/items/SingleLeftPageItem";
import { useLocation } from "react-router-dom";
import { PageURL } from "@/services/utils/pageUrl";

const SidebarLeft = () => {
  const pathname = useLocation().pathname.split("/")[1];
  return (
    <>
      <div className="h-full hidden md:block">
        <ViewItemWithScroll pathname={pathname} />
      </div>
      <div className="h-full flex items-center md:hidden px-2">
        <ViewItem pathname={pathname} />
      </div>
    </>
  );
};

export default SidebarLeft;

const ViewItemWithScroll = ({ pathname }: { pathname: string }) => {
  return (
    <ScrollArea className="h-full w-full rounded-md md:border-r">
      <div className="w-full">
        <UserProfile />
        <div className="flex flex-col w-full gap-2 mb-4 lg:mb-0">
          {sidebarLeft.map((item, i) => (
            <SingleLeftItem key={i} item={item} pathname={pathname} hidden={item!.disabled} inNotificaton={item.link === PageURL.Notification}/>
          ))}
        </div>
        <div className="flex w-full pt-4 lg:pt-0 border-t lg:border-none flex-col gap-2">
          <h3 className="uppercase font-semibold text-[13px] tracking-[0.87px] ml-6 mt-8 mb-2 hidden lg:block">
            pages you like
          </h3>
          {sidebarLeftPage.map((item, i) => (
            <SingleLeftPageItem key={i} item={item} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const ViewItem = ({ pathname }: { pathname: string }) => {
  return (
    <>
      <UserProfile />
      <div className="flex flex-row md:flex-col gap-2 w-full">
        {sidebarLeft.map((item, i) => (
          <SingleLeftItem key={i} item={item} pathname={pathname} hidden={item!.disabled} inNotificaton={item.link === PageURL.Notification}/>
        ))}
      </div>
    </>
  );
};
