import React from "react";
import SinglePost from "@/components/post/item/SinglePost";
import NoPost from "@/components/post/NoPost";
import { IPostDoc } from "@/interfaces/post.interface";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/store/reducers/PostsReducer";
import { Loader2 } from "lucide-react";
import PostSkeleton from "@/components/home/skeleton/PostSkeleton";
// import { PostUtils } from "@/services/utils/postUtils";
// import { userData } from "@/data/AddStoryData";
// import { UserUtils } from "@/services/utils/userUtils";

const AllPost = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();
  const { lastElementRef, loading } = useInfiniteScroll(
    "/posts",
    (data: { posts: IPostDoc[] }) => {
      dispatch(setPosts({ posts: data.posts }));
    }
  );

  const { posts, loading: fLoad } = useSelector(
    (state: RootState) => state.posts
  );

  return fLoad ? (
    <PostSkeleton />
  ) : (
    <div className="mt-2 md:mt-4 flex flex-col gap-4">
      {posts.map(
        (item: IPostDoc, i: number) => (
          // !UserUtils.checkIfUserBlocked([], `${user?._id}`) &&
          // PostUtils.checkPrivacy(item, `${user?._id}`, userData) && (
          <React.Fragment key={i}>
            {posts.length === i + 1 ? (
              <SinglePost item={item} ref={lastElementRef} />
            ) : (
              <SinglePost item={item} />
            )}
          </React.Fragment>
        )
        // )
      )}
      {loading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
      <NoPost />
    </div>
  );
};

export default AllPost;
