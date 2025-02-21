/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessageData } from "@/interfaces/chat.interface";
import { useCallback, useEffect, useRef, useState } from "react";

export const useChat = (conversationId: string | null) => {
  const pageRef = useRef(1);
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);
  const isFirstLoad = useRef(true);

  /** Scroll to the latest message (only for new messages) */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Enables smooth scrolling
      });
    });
  }, []);

  /** Fetch older messages while keeping scroll position */
  const fetchMessages = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const prevScrollHeight = chatContainer?.scrollHeight ?? 0;
    const prevScrollTop = chatContainer?.scrollTop ?? 0;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5500/api/v1/chat/messagess/${
          conversationId ?? ""
        }?page=${pageRef.current}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const newMessages = await response.json();
      if (newMessages?.currentPage > newMessages?.numberOfPages) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => [
          ...newMessages.messages,
          ...prevMessages,
        ]);
        pageRef.current += 1;
      }

      setTimeout(() => {
        if (chatContainer && chatContainerRef.current) {
          const { current: isFirstLoadCurrent } = isFirstLoad;
          const { scrollHeight } = chatContainerRef.current;

          if (isFirstLoadCurrent) {
            chatContainerRef.current.scrollTop = scrollHeight;
            isFirstLoad.current = false;
          } else {
            chatContainer.scrollTop = scrollHeight - prevScrollHeight + prevScrollTop;
          }
        }
      }, 200);
    } catch (err) {
      setError("An error occurred while fetching messages. Please try again.");
      console.error("Error fetching messages:", err);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [conversationId, hasMore]);

  /** Load messages on mount */
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /** Handle sending a new message */
  const handleSendMessage = () => {
    // if (newMessage.trim()) {
    //   const newMsg: IMessageData = {
    //     name: "You",
    //     email: "you@example.com",
    //     body: newMessage.trim(),
    //   };
    //   setMessages((prevMessages) => [...prevMessages, newMsg]);
    //   scrollToBottom();
    // }

    scrollToBottom()
  };

  /** Handle infinite scroll */  
  const handleScroll = useCallback(() => {  
    const chatContainer = chatContainerRef.current;  
    if (!chatContainer || isFetchingRef.current || !hasMore) return;  

    if (chatContainer.scrollTop === 0) {  
      fetchMessages();  
    }  
  }, [fetchMessages, hasMore]);  

  /** Attach and clean up scroll event listener */  
  useEffect(() => {  
    const chatContainer = chatContainerRef.current;  
    if (!chatContainer) return;  

    const debouncedHandleScroll = debounce(handleScroll, 200);  
    chatContainer.addEventListener("scroll", debouncedHandleScroll);  

    return () => {  
      chatContainer.removeEventListener("scroll", debouncedHandleScroll);  
    };  
  }, [handleScroll]); 

  return {
    messages,
    chatContainerRef,
    handleSendMessage,
    error,
    isLoading,
    hasMore,
  };
};



/** Utility function for debouncing */  
function debounce(func: (...args: any[]) => void, wait: number) {  
  let timeout: NodeJS.Timeout | null = null;  
  return function executedFunction(...args: any[]) {  
    if (timeout) clearTimeout(timeout);  
    timeout = setTimeout(() => func(...args), wait);  
  };  
}