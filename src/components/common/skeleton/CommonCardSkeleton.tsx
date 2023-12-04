import { Skeleton } from "@/components/ui/skeleton";

const CommonCardSkeleton = (props: React.PropsWithChildren) => {
  return (
    <div className="max-w-[500px] w-[95%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6 justify-between">
      <div className="flex justify-center items-center flex-col gap-4 py-4">
        <Skeleton className="w-[40%] h-[30px] rounded-md" />
        <Skeleton className="w-[60%] h-[20px] rounded-md" />
      </div>
      <div className="text-center pt-4">{props.children}</div>
      <div className="w-full flex items-center justify-center pt-8 pb-2">
        <Skeleton className="w-[80%] h-[20px] rounded-md" />
      </div>
    </div>
  );
};

export default CommonCardSkeleton;
