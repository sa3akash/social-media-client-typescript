import UserProfile from "./items/UserProfile";
import { sidebarLeft, sidebarLeftPage } from "@/data/SidebarLeftData";
import { SingleLeftItem, SingleLeftPageItem } from "./items/SingleLeftItem";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

const SidebarLeft = () => {
  // let [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {

  //   const navItem = [...sidebarLeft,...sidebarLeftPage]

  //   if (!searchParams.get("feed") || !navItem.some((i) => i.name === searchParams.get("feed"))) {
  //     setSearchParams({ feed: sidebarLeft[0].name });
  //   }
  // }, [searchParams.get("feed")]);

  return (
    <>
      <div className="h-full hidden md:block">
        <ViewItemWithScroll />
      </div>
      <div className="h-full flex items-center md:hidden px-2">
        <ViewItem />
      </div>
    </>
  );
};

export default SidebarLeft;

const ViewItemWithScroll = () => {
  return (
    <ScrollArea className="h-full w-full rounded-md md:border-r md:mb-24">
      <UserProfile />
      <div className="flex flex-col w-full gap-2 mb-4 lg:mb-0">
        {sidebarLeft.map((item, i) => (
          <SingleLeftItem key={i} item={item} />
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
    </ScrollArea>
  );
};

const ViewItem = () => {
  return (
    <>
      <UserProfile />
      <div className="flex flex-row md:flex-col gap-2 w-full">
        {sidebarLeft.map((item, i) => (
          <SingleLeftItem key={i} item={item} />
        ))}
      </div>
    </>
  );
};
