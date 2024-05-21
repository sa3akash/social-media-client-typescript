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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

const ProfilePost = () => {
  const param = useParams();

  const { user } = useSelector((state: RootState) => state.auth);

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
    <section className="w-full h-full mx-auto">
      {param.authId === user?.authId && <AddPost />}
      {/* <AddStory /> */}
      <div
        className={cn(
          "flex flex-col gap-4",
          param.authId === user?.authId ? "mt-2 md:mt-4" : "md:mt-6"
        )}
      >
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
    </section>
  );
};

export default ProfilePost;
