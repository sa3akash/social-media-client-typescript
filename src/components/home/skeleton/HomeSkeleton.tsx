import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import CardSkeleton from "@/components/home/skeleton/CardSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="max-w-[1200px] h-full w-full">
      <div className="w-full mx-auto flex gap-8">
        <PostSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};

export default HomeSkeleton;
