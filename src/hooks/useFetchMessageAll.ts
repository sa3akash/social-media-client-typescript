// import { useState, useEffect, useRef, RefObject, useCallback } from "react";
// import api from "@/services/http/index";
// import { IMessageData } from "@/interfaces/chat.interface";

// // interface ScrollableContainerProps {
// //   scrollTop: number;
// //   scrollHeight: number;
// //   addEventListener: (event: string, listener: () => void) => void;
// //   removeEventListener: (event: string, listener: () => void) => void;
// // }

// interface InfiniteScrollHook {
//   messages: IMessageData[];
//   addMessage: (message: IMessageData) => void;
//   containerRef: RefObject<HTMLDivElement>;
//   loading: boolean;
// }

// const useFetchMessageAll = (
//   conversationId: string | null,
//   // initialMessages: IMessageData[] = []
// ): InfiniteScrollHook => {
//   const [messages, setMessages] = useState<IMessageData[]>([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     fetchMoreMessages();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [conversationId]);

//   const fetchMoreMessages = useCallback(() => {
//     if(!conversationId) return;
//     setLoading(true);
//     api
//       .get(`/chat/messagess/${conversationId}?page=${pageNumber}`)
//       .then(({ data }) => {
//         setMessages((prevMessages) => [...prevMessages, ...data.messages]);
//         setPageNumber((prevPageNumber) => prevPageNumber + 1);
//       })
//       .catch((error) => {
//         console.error("Error fetching more messages:", error);
//       });
//   },[conversationId, pageNumber]);

//   useEffect(() => {

//     const handleScroll = () => {
//       if (
//         containerRef.current &&
//         containerRef.current.scrollTop === 0 &&
//         !loading
//       ) {
//         fetchMoreMessages();
//       }
//     };

//     const currentContainerRef = containerRef.current;
//     if (currentContainerRef) {
//       currentContainerRef.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       if (currentContainerRef) {
//         currentContainerRef.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, [pageNumber, loading, conversationId, fetchMoreMessages]);

//   const scrollToBottom = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollTop = containerRef.current.scrollHeight;
//     }
//   };

//   const addMessage = (message: IMessageData) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return { messages, addMessage, containerRef, loading };
// };

// export default useFetchMessageAll;

// const MyComponent: React.FC = () => {
//   const { messages, addMessage, containerRef, loading } = useInfiniteScroll();

//   // Your component logic here

//   return (
//     <div ref={containerRef}>
//       {/* Render your messages */}
//       {messages.map((message, index) => (
//         <div key={index}>{message}</div>
//       ))}
//       {/* Render loading indicator if loading is true */}
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// };

// ============================

import { useState, useEffect, useRef, RefObject } from "react";
import api from "@/services/http/index";
import { IMessageData } from "@/interfaces/chat.interface";

interface InfiniteScrollHook {
  messages: IMessageData[];
  addMessage: (message: IMessageData) => void;
  containerRef: RefObject<HTMLDivElement>;
  loading: boolean;
}

const useFetchMessageAll = (
  conversationId: string | null,
): InfiniteScrollHook => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessageData[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setMessages([]);
    setPageNumber(1);
    setLoading(false);
  }, [conversationId]);

  useEffect(() => {
    const handleScroll = (e) => {
      console.log(e);
      if (containerRef.current && containerRef.current.scrollTop === 0) {
        // setPageNumber((prev) => prev + 1);
        console.log("run main");
      }
    };

    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (!conversationId) return;

    api
      .get(`/chat/messagess/${conversationId}?page=${pageNumber}`)
      .then(({ data }) => {
        setMessages((prev) => [...data.messages, ...prev]);
        setTotalPages(data.numberOfPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [conversationId, pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("run");
      if (
        containerRef.current &&
        containerRef.current.scrollTop === 0 &&
        !loading &&
        totalPages >= pageNumber
      ) {
        // setPageNumber((prev) => prev + 1);
        console.log("run main");
      }
    };

    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, pageNumber, totalPages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      container.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessage = (m: IMessageData) => {
    setMessages((prevMessages) => [...prevMessages, m]);
  };

  return { messages, containerRef, loading, addMessage };
};

export default useFetchMessageAll;
