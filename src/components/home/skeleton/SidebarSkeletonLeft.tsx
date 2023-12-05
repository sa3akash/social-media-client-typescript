import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarSkeletonLeft = () => {
  return (
    <ScrollArea className="h-full w-full rounded-md md:border-r">
      <div className="w-full md:mt-6">
        <Skeleton className="w-full md:w-[210px] h-[50px] md:rounded-lg m-auto " />
        <div className="hidden md:flex flex-col gap-4 w-full mt-8">
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
          <Skeleton className="w-full md:w-[210px] h-[40px] md:rounded-lg m-auto " />
        </div>
      </div>
    </ScrollArea>
  );
};

export default SidebarSkeletonLeft;
