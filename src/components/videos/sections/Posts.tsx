import HomeSkeleton from "@/components/home/skeleton/HomeSkeleton";
import { Suspense, lazy } from "react";

const VideoCardArea = lazy(() => import("@/components/videos/VideoCardArea"));
const VideoPostArea = lazy(() => import("@/components/videos/VideoPostArea"));

const Posts = () => {
  return (
    <>
      <Suspense fallback={<HomeSkeleton />}>
        <VideoPostArea />
        <VideoCardArea />
      </Suspense>
    </>
  );
};

export default Posts;
