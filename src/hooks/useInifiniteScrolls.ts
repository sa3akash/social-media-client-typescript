import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
  } from "react";
  
  import { useCallback } from "react";
  
  export const useInfiniteScrollBottom = <T,>(
    urlWithEndpoint: string,
    pageQueryKeyword: string,
    limitQueryKeyword: string,
    limit: number,
    listClassName: string,
    totalPages: number = 1
  ) => {
    const [data, setData] = useState<T[]>([]);
  
    const [page, setPage] = useState(1);
  
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
  
    const timeoutId = useRef<number | null>(null);
  
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
  
        const response = await fetch(
          `${urlWithEndpoint}?${pageQueryKeyword}=${page}&${limitQueryKeyword}=${limit}`,
          { credentials: "include" }
        );
  
        if (!response.ok) throw new Error("Something went wrong");
  
        const newData = await response.json();
        setData((oldData) => [...oldData, ...newData]);
        setHasMore(newData.length > 0);
      } catch (error) {
        setError((error as string) || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }, [page, limit, urlWithEndpoint, pageQueryKeyword, limitQueryKeyword]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    useEffect(() => {
      const loadMore = () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
  
        timeoutId.current = setTimeout(() => {
          if (totalPages === page) return;
          setPage((oldPage) => oldPage + 1);
        }, 200);
      };
  
      const observerDown = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            loadMore();
          }
        },
        {
          rootMargin: "100px",
        }
      );
  
      // Observe the last list item
      const lastListItem = document.querySelector(
        `.${listClassName}:last-of-type`
      );
  
      if (lastListItem) {
        observerDown.observe(lastListItem);
      }
  
      return () => {
        observerDown.disconnect();
        if (timeoutId.current) clearTimeout(timeoutId.current);
      };
    }, [totalPages, page, hasMore, loading]);
  
    return {
      loading,
      hasMore,
      page,
      error,
      data,
      setData,
    };
  };
  
  export const useInfiniteScrollTop = <T extends { _id: string | number }>(
    containerRef: MutableRefObject<HTMLElement | null>,
    totalPages: number,
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    newData: T[],
    shouldReverse: boolean = false
  ) => {
    const [data, setData] = useState<T[]>([]);
  
    const debounceTimer = useRef<number | null>(null);
  
    const handleScroll = useCallback(() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
  
      debounceTimer.current = setTimeout(() => {
        if (!containerRef.current) return;
  
        const { scrollTop } = containerRef.current;
        const scrolledToTop = scrollTop === 0;
  
        if (scrolledToTop) {
          if (totalPages === page) return;
          setPage((oldPage) => oldPage + 1);
        }
      }, 200);
    }, [totalPages, page]);
  
    useEffect(() => {
      const container = containerRef.current;
  
      if (container) container.addEventListener("scroll", handleScroll);
  
      return () => {
        if (container) container.removeEventListener("scroll", handleScroll);
      };
    }, [handleScroll, data]);
  
    useEffect(() => {
      let prevScrollHeight = 0;
      let prevScrollTop = 0;
  
      if (containerRef.current) {
        prevScrollHeight = containerRef.current.scrollHeight;
        prevScrollTop = containerRef.current.scrollTop;
      }
  
      if (newData) {
        setData((oldData) => {
          const seen = new Set(oldData.map((i) => i._id));
          const newMessages = newData?.filter((i) => !seen.has(i._id));
  
          if (shouldReverse) {
            const newDataArray = Array.isArray(newMessages)
              ? [...newMessages]
              : [newMessages];
  
            return [...newDataArray.reverse(), ...oldData];
          } else {
            return [...newMessages, ...oldData];
          }
        });
      }
  
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const newScrollTop =
            prevScrollTop + containerRef.current.scrollHeight - prevScrollHeight;
          containerRef.current.scrollTop = newScrollTop;
        }
      });
    }, [newData]);
  
    return { data, setData };
  };
  