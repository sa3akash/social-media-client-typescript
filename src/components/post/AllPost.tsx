import SinglePost from "@/components/post/item/SinglePost";
import NoPost from "@/components/post/NoPost";
import { IPostDoc } from "@/interfaces/post.interface";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/store/reducers/PostsReducer";
import { Loader2 } from "lucide-react";

const AllPost = () => {
  const dispatch: AppDispatch = useDispatch();
  const { lastElementRef, loading } = useInfiniteScroll(
    "/posts",
    (data: { posts: IPostDoc[] }) => {
      console.log(data.posts);
      dispatch(setPosts({ posts: data.posts }));
    }
  );

  const { posts } = useSelector((state: RootState) => state.posts);

  return (
    <div className="mt-2 md:mt-4 flex flex-col gap-4">
      {posts.map((item: IPostDoc, i: number) =>
        posts.length === i + 1 ? (
          <SinglePost key={i} item={item} ref={lastElementRef} />
        ) : (
          <SinglePost key={i} item={item} />
        )
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
