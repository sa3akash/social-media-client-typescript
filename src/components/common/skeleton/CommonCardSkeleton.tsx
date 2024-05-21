import { Skeleton } from "@/components/ui/skeleton";

const CommonCardSkeleton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      <div className="w-full sm:w-[80%] md:-[50%] lg:w-[80%] 2xl:w-[70%] h-full sm:h-[700px] flex items-center cardBG sm:rounded-lg">
        <div className="hidden lg:flex flex-1 h-full bg-[#292932] items-center justify-center flex-col gap-2">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default CommonCardSkeleton;
