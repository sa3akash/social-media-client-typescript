import PhotosHeader from "@/components/photos/PhotosHeader";
import SinglePhoto from "@/components/photos/SinglePhoto";
import { IPostDoc } from "@/interfaces/post.interface";
import { Loader2 } from "lucide-react";
import { useInfinitePostsImage } from "@/hooks/testhook/useGetPostWithImage";

const PhotoPage = () => {
  const { posts, isFetching, lastPostRef } = useInfinitePostsImage();

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <PhotosHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-0">
        {posts.map((post: IPostDoc, index: number) => (
          <SinglePhoto
            post={post}
            ref={posts.length === index + 1 ? lastPostRef : null}
            key={index}
          />
        ))}
        {isFetching && (
          <p className="p-4 flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6" />
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
