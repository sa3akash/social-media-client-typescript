import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import CardSkeleton from "@/components/home/skeleton/CardSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="max-w-[1000px] h-full w-[100%] flex gap-8 ">
      <PostSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default HomeSkeleton;
