import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import usePostSocket from "@/hooks/socket/usePostSocket";
import { Suspense, lazy, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Posts = lazy(() => import("@/components/videos/sections/Posts"));
const Reals = lazy(() => import("@/components/videos/sections/Reals"));

const Videos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!tab || (tab !== "posts" && tab !== "reals" && tab !== "live")) {
      setSearchParams({
        tab: "posts",
      });
    }
  }, [setSearchParams, tab]);


  usePostSocket();

  return (
    <div className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full flex gap-8">
      {tab === "posts" && (
        <Suspense fallback={<PostSkeleton />}>
          <Posts />
        </Suspense>
      )}

      {tab === "reals" && (
        <Suspense fallback={"Loading"}>
          <Reals />
        </Suspense>
      )}
      {tab === "live" && <>live</>}
    </div>
  );
};

export default Videos;
