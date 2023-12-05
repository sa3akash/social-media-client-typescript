import { Skeleton } from "@/components/ui/skeleton";
import AddStorySkeleton from "@/components/home/skeleton/AddStorySkeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full h-[calc(100%-80px)] 2xl:md:max-w-[640px] 2xl:mx-auto md:w-[95%] xl:w-full md:mx-auto">
      <div className="cardBG md:mt-6 md:rounded-xl md:borderWrapper">
        <Skeleton className="w-full h-[124px] md:rounded-lg m-auto] dark:bg-[#1C1C24]" />
      </div>
      <AddStorySkeleton />
      <div className="md:rounded-xl mt-4 flex flex-col gap-4">
        <Skeleton className="w-full h-[818px] md:rounded-lg m-auto ] dark:bg-[#1C1C24]" />
        <Skeleton className="w-full h-[818px] md:rounded-lg m-auto ] dark:bg-[#1C1C24]" />
      </div>
    </div>
  );
};

export default PostSkeleton;
