import useReactInfiniteScroll from "@/hooks/useReactInfiniteScroll";
import React from "react";
import PostSkeleton from "../home/skeleton/PostSkeleton";
import api from "@/services/http";

const AllVideoPosts = () => {
  const { data, lastElementRef, loading } = useReactInfiniteScroll({
    baseURL: "posts/videos",
    fn: async ({ pageParam = 1 }) => {
      const response = await api.get(`/posts/video?page=${pageParam}`);
      return response.data;
    },
  });

  if (!data) {
    return <PostSkeleton />;
  }

  const mainData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.postWithVideos];
  }, []);

  console.log(mainData);

  return <div className="mt-4">AllVideoPosts</div>;
};

export default AllVideoPosts;
