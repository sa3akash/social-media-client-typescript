import { Skeleton } from "@/components/ui/skeleton";

const FriendsSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 md:gap-4 mt-2 md:mt-8">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2 md:gap-4">
        <Skeleton className="w-full md:w-[95%] xl:w-full mx-auto h-[56px] rounded-md dark:bg-[#1C1C24]" />
        <div className="flex flex-col gap-2 h-full">
          {[1, 2, 3, 4, 5].map((_item, index) => (
            <Skeleton
              className="w-full md:w-[95%] xl:w-full mx-auto h-[148px] rounded-md dark:bg-[#1C1C24]"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsSkeleton;
