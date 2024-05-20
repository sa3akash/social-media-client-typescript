import PhotosHeader from "@/components/photos/PhotosHeader";
import SinglePhoto from "@/components/photos/SinglePhoto";
import useReactInfiniteScroll from "@/hooks/useReactInfiniteScroll";
import api from "@/services/http";
import { IPostDoc } from "@/interfaces/post.interface";
import { Loader2 } from "lucide-react";

const PhotoPage = () => {
  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: "posts/images",
    fn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/posts/image?page=${pageParam}`);
      return response.data;
    },
  });

  if (!data) {
    return null;
  }

  const mainData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.postWithImages];
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-8">
      <PhotosHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 md:px-0">
        {mainData.map((post: IPostDoc, index: number) => (
          <SinglePhoto
            post={post}
            ref={mainData.length === index + 1 ? lastElementRef : null}
            key={index}
          />
        ))}
        {loading && (
          <p className="p-4 flex items-center justify-center">
            <Loader2 className="animate-spin w-6 h-6" />
          </p>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
