import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ForgotSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCardSkeleton>
        <div className="text-left space-y-4 flex flex-col">
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
      </CommonCardSkeleton>
    </div>
  );
};

export default ForgotSkeleton;
