import NavbarSkeleton from "@/components/common/skeleton/NavbarSkeleton";
import SidebarSkeletonLeft from "@/components/home/skeleton/SidebarSkeletonLeft";
import { Outlet } from "react-router-dom";

const LayoutSkeleton = () => {
  return (
    <div className="h-full">
      <div className="h-[70px] md:h-[80px] cardBG border-b">
        <NavbarSkeleton />
      </div>
      <div className="flex flex-col md:flex-row md:gap-6 h-full w-full justify-start md:justify-between">
        <div className="h-[70px] w-full md:w-[90px] lg:max-w-[260px] lg:w-full cardBG md:h-[calc(100%-80px)] border-b md:border-none">
          <SidebarSkeletonLeft />
        </div>
        <Outlet />
        <div className="hidden xl:block max-w-[310px] w-full cardBG h-full border-l">
          <SidebarSkeletonLeft />
        </div>
      </div>
    </div>
  );
};

export default LayoutSkeleton;
