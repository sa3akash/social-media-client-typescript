import CardSkeleton from "@/components/home/skeleton/CardSkeleton";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-[1200px] h-full w-full flex gap-8">
      <div className="h-full w-full md:mx-auto">
        <Skeleton className="h-[357px] md:h-[306px] w-full md:w-[95%] xl:w-full md:mx-auto md:mt-6 dark:bg-[#1C1C24]" />
        <div className="flex gap-8 w-full h-full mt-2 md:mt-0">
          <CardSkeleton />
          <PostSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
