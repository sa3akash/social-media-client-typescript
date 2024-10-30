import { ICommentType } from "@/interfaces/post.interface";
import { useGetCommantByPostIdQuery } from "@/store/rtk/post/commantSlice";
import { useEffect, useState, useRef, useCallback } from "react";

export const useInfiniteCommant = (postId: string) => {
  const [page, setPage] = useState(1); // Track the current page
  const lastPostRef = useRef<HTMLDivElement | null>(null); // Ref for the last post element
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref for the observer

  const { data, isFetching, isError } = useGetCommantByPostIdQuery({postId,page});

  const commants: ICommentType[] = data?.comments || [];

  // Callback to load more posts
  const loadMorePosts = useCallback(() => {
    if (data && !isFetching && data.currentPage < data.numberOfPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, isFetching]);

  // IntersectionObserver to observe last post
  useEffect(() => {
    if (isFetching) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isFetching, loadMorePosts]);

  return { commants, isFetching, isError, lastPostRef };
};
