import { Skeleton } from "@/components/ui/skeleton";
import AddStorySkeleton from "@/components/home/skeleton/AddStorySkeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full h-[calc(100%-80px)] md:max-w-[640px] md:w-[95%] mx-auto">
      <div className="cardBG md:mt-6 md:rounded-xl md:borderWrapper">
        <Skeleton className="w-full h-[124px] md:rounded-lg m-auto" />
      </div>
      <AddStorySkeleton />
      <div className="md:rounded-xl mt-4 flex flex-col gap-4">
        <Skeleton className="w-full h-[818px] md:rounded-lg m-auto" />
        <Skeleton className="w-full h-[818px] md:rounded-lg m-auto" />
      </div>
    </div>
  );
};

export default PostSkeleton;
