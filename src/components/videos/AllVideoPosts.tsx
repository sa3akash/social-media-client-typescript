import NoPost from "../post/NoPost";
import { Loader2 } from "lucide-react";
import { UserUtils } from "@/services/utils/userUtils";
import { IPostDoc } from "@/interfaces/post.interface";
import SingleVideoItem from "./items/SingleVideoItem";
import { useInfinitePostsVideo } from "@/hooks/testhook/useGetPostWithVideo";

const AllVideoPosts = () => {
  const { isFetching, videos, lastPostRef } = useInfinitePostsVideo();

  return (
    <div className="mt-2 md:mt-4 flex flex-col gap-4">
      {videos.map(
        (item: IPostDoc, i: number) =>
          UserUtils.checkPrivacyPost(item) && (
            <SingleVideoItem
              item={item}
              ref={videos.length === i + 1 ? lastPostRef : null}
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
  );
};

export default AllVideoPosts;
