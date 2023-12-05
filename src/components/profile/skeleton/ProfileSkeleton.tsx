import CardSkeleton from "@/components/home/skeleton/CardSkeleton";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-[1000px] h-full w-[100%] flex gap-8">
      <div className="h-full w-full">
        <Skeleton className="h-[357px] md:h-[331px] w-full md:w-[95%] xl:w-full md:mx-auto mt-2 md:mt-6" />
        <div className="flex gap-8 w-full h-full mt-2 md:mt-0">
          <CardSkeleton />
          <PostSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
