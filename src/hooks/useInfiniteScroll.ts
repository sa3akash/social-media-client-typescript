/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/services/http";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(
  url: string,
  fn: (data: any) => void,
) {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${url}?page=${pageNumber}`)
      .then((data) => {
        fn(data.data);
        setTotalPages(data.data?.numberOfPages);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, url]);
  // Create the IntersectionObserver outside the component
  const observer = useRef<IntersectionObserver | null>(null);

  // Inside your component
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (pageNumber >= totalPages) return;
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
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

    [loading, pageNumber, totalPages],
  );

  return { loading, lastElementRef };
}
