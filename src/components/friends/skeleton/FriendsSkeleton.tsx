import { Skeleton } from "@/components/ui/skeleton";

const FriendsSkeleton = () => {
  return (
    <div className=" flex flex-col gap-2 md:gap-4 mt-2 md:mt-8 max-w-[1200px] h-[calc(100%-140px)] md:h-[calc(100%-80px)] w-full">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full md:w-[95%] xl:w-full mx-auto h-[56px] rounded-md dark:bg-[#1C1C24]" />
        <div className="h-full grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((_item, index) => (
            <Skeleton
              className="w-full md:w-[95%] xl:w-full mx-auto h-[120px] md:h-[258px] rounded-md dark:bg-[#1C1C24]"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSkeleton;
