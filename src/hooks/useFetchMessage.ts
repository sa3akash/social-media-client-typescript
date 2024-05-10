import { useState, useEffect, useRef, RefObject } from "react";

interface ScrollableContainerProps {
  scrollTop: number;
  scrollHeight: number;
  addEventListener: (event: string, listener: () => void) => void;
  removeEventListener: (event: string, listener: () => void) => void;
}

interface InfiniteScrollHook {
  messages: string[];
  addMessage: (message: string) => void;
  addMoreMessage: (messages: string[]) => void;
  containerRef: RefObject<ScrollableContainerProps>;
}

const useFetchMessage = (
  fetchMoreMessages: () => void,
  initialMessages: string[] = [],
): InfiniteScrollHook => {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const containerRef = useRef<ScrollableContainerProps>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current?.scrollTop === 0) {
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
  }, [fetchMoreMessages]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const addMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const addMoreMessage = (messages: string[]) => {
    setMessages((prevMessages) => [...messages, ...prevMessages]);
  };

  return { messages, addMessage, addMoreMessage, containerRef };
};

export default useFetchMessage;

// ============================== call ===========================

// import React, { useState } from 'react';
// import useInfiniteScroll from './useInfiniteScroll';

// const MessengerApp = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { messages, addMessage, containerRef } = useInfiniteScroll(fetchMoreMessages, []);

//   const fetchMoreMessages = () => {
//     if (!isLoading) {
//       setIsLoading(true);
//       // Simulated API call or any asynchronous action to fetch more messages
//       setTimeout(() => {
//         const newMessages = ['Message 1', 'Message 2', 'Message 3'];
//         addMessage(newMessages);
//         setIsLoading(false);
//       }, 1000);
//     }
//   };

//   return (
//     <div ref={containerRef} className="message-container">
//       {messages.map((message, index) => (
//         <div key={index} className="message">
//           {message}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessengerApp;
