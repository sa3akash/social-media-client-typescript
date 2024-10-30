import { lazy, Suspense } from "react";
// import SinglePost from "@/components/post/item/SinglePost";

import NoPost from "@/components/post/NoPost";
import { IPostDoc } from "@/interfaces/post.interface";
import { Loader2 } from "lucide-react";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import { UserUtils } from "@/services/utils/userUtils";
import { useInfiniteScrollPosts } from "@/hooks/testhook/useGetPost";


const SinglePost = lazy(() => import("@/components/post/item/SinglePost"));

const AllPost = () => {
  const { posts, isFetching, lastPostRef } = useInfiniteScrollPosts();
 

  return (
    <section className="mt-2 md:mt-4 flex flex-col gap-4">
      {posts.map(
        (item: IPostDoc, i: number) =>
          UserUtils.checkPrivacyPost(item) && (
            <Suspense key={i} fallback={<PostSkeleton />}>
              <SinglePost
                item={item}
                ref={posts.length === i + 1 ? lastPostRef : null}
                key={i}
              />
            </Suspense>
          )
      )}
      {isFetching ? (
        <p className="p-4 flex items-center justify-center mb-5">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      ) : (
        <NoPost />
      )}
    </section>
  );
};

export default AllPost;
