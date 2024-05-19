/* eslint-disable @typescript-eslint/no-explicit-any */
import { giphyService } from "@/services/http/giphy";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

const useReactInfiniteScrollGiphy = (debouncedValue?: string) => {
  const apiCall = async ({ pageParam = 1 }) => {
    if (debouncedValue) {
      const response = await giphyService.search(debouncedValue, pageParam);
      return response.data;
    } else {
      const response = await giphyService.trending(pageParam);
      return response.data;
    }
  };

  const { fetchNextPage, hasNextPage, data, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        `${
          debouncedValue
            ? `giphysearch/${debouncedValue}`
            : "trandingQueryGiphy"
        }`,
      ],
      queryFn: apiCall,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.total_count > lastPage.pagination.offset) {
          return lastPage.pagination.offset + 1;
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

  const mainData =
    data?.pages.reduce((acc, page) => {
      return [...acc, ...page.data];
    }, []) || [];

  return { data: mainData, lastElementRef, loading: isFetchingNextPage };
};

export default useReactInfiniteScrollGiphy;
