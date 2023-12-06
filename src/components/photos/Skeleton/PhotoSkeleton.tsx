import { Skeleton } from "@/components/ui/skeleton";

const PhotoSkeleton = () => {
  return (
    <div className="max-w-[1200px] h-full w-full mt-8">
      <div className="h-full w-full md:w-[95%] mx-auto">
        <Skeleton className="w-full h-[48px] rounded-lg" />
        <div className="w-full h-full flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-0">
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
            <Skeleton className="w-full h-[250px] md:h-[250px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSkeleton;
