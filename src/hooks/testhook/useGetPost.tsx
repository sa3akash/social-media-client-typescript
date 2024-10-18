import { IPostDoc } from "@/interfaces/post.interface";
import { useGetPaginatedPostsQuery } from "@/store/rtk/post/getPostSlice";
import { useEffect, useState, useRef, useCallback } from "react";

export const useInfiniteScrollPosts = () => {
  const [page, setPage] = useState(1); // Track the current page
  const lastPostRef = useRef<HTMLDivElement | null>(null); // Ref for the last post element
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref for the observer

  const { data, isFetching, isError } = useGetPaginatedPostsQuery(page);

  const posts: IPostDoc[] = data?.posts || [];

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

  // Fallback: Trigger loading when user scrolls near the bottom of the page
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const scrollHeight = document.documentElement.scrollHeight;
  //       const scrollTop = document.documentElement.scrollTop;
  //       const clientHeight = window.innerHeight;

  //       // If user is near the bottom of the page (within 300px), trigger load more
  //       if (scrollHeight - scrollTop <= clientHeight + 300 && !isFetching) {
  //         loadMorePosts();
  //       }
  //     };

  //     window.addEventListener('scroll', handleScroll);

  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, [isFetching, loadMorePosts]);

  // useEffect(() => {
  //     const handleScroll = () => {
  //       const container = containerRef.current;
  //       if (!container) return;

  //       const scrollTop = container.scrollTop;
  //       const scrollHeight = container.scrollHeight;
  //       const clientHeight = container.clientHeight;

  //       // Trigger loading when scrolled near the bottom (within 300px of the container)
  //       if (scrollHeight - scrollTop <= clientHeight + 300 && !isFetching) {
  //         loadMorePosts();
  //       }
  //     };

  //     const container = containerRef.current;
  //     if (container) {
  //       container.addEventListener('scroll', handleScroll);
  //     }

  //     return () => {
  //       if (container) {
  //         container.removeEventListener('scroll', handleScroll);
  //       }
  //     };
  //   }, [isFetching, loadMorePosts]);

  return { posts, isFetching, isError, lastPostRef };
};
