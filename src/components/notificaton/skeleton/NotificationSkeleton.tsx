import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full gap-2 mt-6">
      <Skeleton className="hidden md:block w-full md:w-[95%] xl:w-full mx-auto h-[40px] rounded-md dark:bg-[#1C1C24]" />

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
