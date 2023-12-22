import { INotification } from "@/interfaces/notificaton.interface";
import api from "@/services/http";
import { AppDispatch } from "@/store";
import { setNotification } from "@/store/reducers/NotificationReducer";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function useInfiniteScroll(url: string) {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    api
      .get(`${url}?page=${pageNumber}`)
      .then((data) => {
        dispatch(
          setNotification({
            notifications: data.data?.notifications as INotification[],
          }),
        );
        setTotalPages(data.data?.numberOfPages);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, pageNumber, url]);

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

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) {
        observer.current.observe(node); // Start observing the new node
      }
    },

    [loading, pageNumber, totalPages],
  );

  return { loading, lastElementRef };
}

// how to use

// const { data, loading, error, lastElementRef } = useInfiniteScroll("https://jsonplaceholder.typicode.com/posts");
