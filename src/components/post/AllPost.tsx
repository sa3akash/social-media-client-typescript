import SinglePost from "@/components/post/item/SinglePost";
import NoPost from "@/components/post/NoPost";
import { IPostDoc } from "@/interfaces/post.interface";
import { Loader2 } from "lucide-react";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import { UserUtils } from "@/services/utils/userUtils";
import useReactInfiniteScroll from "@/hooks/useReactInfiniteScroll";
import api from "@/services/http";

const AllPost = () => {
  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: "posts",
    fn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/posts?page=${pageParam}`);
      return response.data;
    },
  });

  if (!data) {
    return <PostSkeleton />;
  }

  const mainData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.posts];
  }, []);

  return (
    <section className="mt-2 md:mt-4 flex flex-col gap-4">
      {mainData.map(
        (item: IPostDoc, i: number) =>
          UserUtils.checkPrivacyPost(item) && (
            <SinglePost
              item={item}
              ref={mainData.length === i + 1 ? lastElementRef : null}
              key={i}
            />
          )
      )}
      {loading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
      <NoPost />
    </section>
  );
};

export default AllPost;
