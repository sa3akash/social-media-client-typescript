import { ICommentType } from "@/interfaces/post.interface";
import { useGetCommantByPostIdQuery } from "@/store/rtk/post/commantSlice";
import { useEffect, useState, useRef, useCallback } from "react";

export const useInfiniteCommant = (postId: string) => {
  const [lastCreatedAt, setLastCreatedAt] = useState(''); // Track the current page
  const lastPostRef = useRef<HTMLDivElement | null>(null); // Ref for the last post element
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref for the observer

  const { data, isFetching, isError } = useGetCommantByPostIdQuery({postId,lastCreatedAt});

  const commants: ICommentType[] = data || [];

  // Callback to load more posts
  const loadMorePosts = useCallback(() => {
    if (data && !isFetching && data.length > 5) {
      setLastCreatedAt(data[data?.length - 1]?.createdAt);
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
