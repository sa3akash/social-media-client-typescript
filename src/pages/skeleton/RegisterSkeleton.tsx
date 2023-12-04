import CommonCardSkeleton from "@/components/common/skeleton/CommonCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const RegisterSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <CommonCardSkeleton>
        <div className="text-left space-y-6 flex flex-col">
          <div className="flex items-center gap-6 max-sm:flex-col w-full">
            <Skeleton className="w-full h-[30px] rounded-md" />
            <Skeleton className="w-full h-[30px] rounded-md" />
          </div>
          <Skeleton className="w-full h-[30px] rounded-md" />

          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[20px] rounded-md" />

          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
      </CommonCardSkeleton>
    </div>
  );
};

export default RegisterSkeleton;
