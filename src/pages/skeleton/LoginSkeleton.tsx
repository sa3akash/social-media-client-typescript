import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const LoginSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCardSkeleton>
        <div className="text-left space-y-4 flex flex-col">
          <Skeleton className="w-full h-[30px] rounded-md" />

          <Skeleton className="w-full h-[30px] rounded-md" />

          <div className="flex justify-between items-center gap-28 pb-4">
            <Skeleton className="w-full h-[20px] rounded-md" />
            <Skeleton className="w-full h-[20px] rounded-md" />
          </div>

          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
      </CommonCardSkeleton>
    </div>
  );
};

export default LoginSkeleton;
