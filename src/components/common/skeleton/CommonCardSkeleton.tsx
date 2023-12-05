import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CommonCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Skeleton className={cn("w-[500px] h-[500px] rounded-lg dark:bg-[#1C1C24]", className)} />
    </div>
  );
};

export default CommonCardSkeleton;
