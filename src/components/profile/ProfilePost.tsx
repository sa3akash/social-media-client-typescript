import AddPost from "@/components/post/AddPost";
// import AddStory from "@/components/post/AddStory";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
import { IPostDoc } from "@/interfaces/post.interface";
import { UserUtils } from "@/services/utils/userUtils";
import SinglePost from "../post/item/SinglePost";
import { Loader2 } from "lucide-react";
import NoPost from "../post/NoPost";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import { useInfiniteUserPosts } from "@/hooks/testhook/useGetUserPosts";

const ProfilePost = () => {
  const param = useParams();

  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, lastPostRef, isFetching } = useInfiniteUserPosts(
    param?.authId as string
  );

  if (!posts) {
    return <PostSkeleton />;
  }

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
        {posts.map(
          (item: IPostDoc, i: number) =>
            UserUtils.checkPrivacyPost(item) && (
              <SinglePost
                item={item}
                ref={posts.length === i + 1 ? lastPostRef : null}
                key={i}
              />
            )
        )}
        {isFetching && (
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
