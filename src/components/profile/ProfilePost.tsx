import AddPost from "@/components/post/AddPost";
// import AddStory from "@/components/post/AddStory";
import useReactInfiniteScroll from "@/hooks/useReactInfiniteScroll";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import api from "@/services/http";
import { IPostDoc } from "@/interfaces/post.interface";
import { UserUtils } from "@/services/utils/userUtils";
import SinglePost from "../post/item/SinglePost";
import { Loader2 } from "lucide-react";
import NoPost from "../post/NoPost";
import { useParams } from "react-router-dom";

const ProfilePost = () => {
  const param = useParams();

  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: `posts/user/${param.authId}`,
    fn: async ({ pageParam = 1 }) => {
      const response = await api.get(
        `/posts/user/${param.authId}?page=${pageParam}`
      );
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
    <div className="w-full h-full mx-auto">
      <AddPost />
      {/* <AddStory /> */}
      <div className="mt-2 md:mt-4 flex flex-col gap-4">
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
      </div>
    </div>
  );
};

export default ProfilePost;
