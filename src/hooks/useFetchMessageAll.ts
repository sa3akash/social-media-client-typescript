import { useState, useEffect, useRef, RefObject } from "react";
import api from "@/services/http/index";
import { IMessageData } from "@/interfaces/chat.interface";

// interface ScrollableContainerProps {
//   scrollTop: number;
//   scrollHeight: number;
//   addEventListener: (event: string, listener: () => void) => void;
//   removeEventListener: (event: string, listener: () => void) => void;
// }

interface InfiniteScrollHook {
  messages: IMessageData[];
  addMessage: (message: IMessageData) => void;
  containerRef: RefObject<HTMLDivElement>;
  loading: boolean;
}

const useFetchMessageAll = (
  conversationId: string,
  initialMessages: IMessageData[] = []
): InfiniteScrollHook => {
  const [messages, setMessages] = useState<IMessageData[]>(initialMessages);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMoreMessages = async () => {
      setLoading(true);
      try {
        // Simulated API call or any asynchronous action to fetch more messages
        const { data } = await api.get(
          `/chat/messagess/${conversationId}?page=${pageNumber}`
        );

        setMessages((prevMessages) => [...prevMessages, ...data.messages]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      } catch (error) {
        console.error("Error fetching more messages:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop === 0 &&
        !loading
      ) {
        fetchMoreMessages();
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
  }, [pageNumber, loading, conversationId]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const addMessage = (message: IMessageData) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { messages, addMessage, containerRef, loading };
};

export default useFetchMessageAll;



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
