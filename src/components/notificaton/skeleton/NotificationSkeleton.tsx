import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-2 md:mt-6 max-w-[1200px] h-[calc(100%-140px)] md:h-[calc(100%-80px)] w-full">
      <Skeleton className="w-full md:w-[95%] xl:w-full mx-auto h-[80px] rounded-md dark:bg-[#1C1C24]" />

      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_item, index) => (
          <Skeleton
            className="w-full md:w-[95%] xl:w-full mx-auto h-[100px] md:h-[77px] rounded-md dark:bg-[#1C1C24]"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationSkeleton;
