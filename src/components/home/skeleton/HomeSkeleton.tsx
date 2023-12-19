import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import CardSkeleton from "@/components/home/skeleton/CardSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="max-w-[1200px] h-full w-full flex gap-8 ">
      <PostSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default HomeSkeleton;
