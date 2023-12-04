import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CommonCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Skeleton className={cn("w-[500px] h-[500px] rounded-lg", className)} />
    </div>
  );
};

export default CommonCardSkeleton;
