/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface Props {
  baseURL: string;
  fn: ({ pageParam }: { pageParam?: number | undefined }) => Promise<any>;
}

const useReactInfiniteScroll = ({ baseURL, fn }: Props) => {
  const { fetchNextPage, hasNextPage, data, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [baseURL],
      queryFn: fn,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.numberOfPages) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
      staleTime: 1000 * 60,
    });

  // Create the IntersectionObserver outside the component
  const observer = useRef<IntersectionObserver | null>(null);

  // Inside your component
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (!hasNextPage) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },

    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return { data, lastElementRef, loading: isFetchingNextPage };
};

export default useReactInfiniteScroll;
