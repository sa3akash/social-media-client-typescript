/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessageData } from '@/interfaces/chat.interface';
import { useGetMessagesQuery } from '@/store/rtk/message/message';
import { useEffect, useRef, useCallback, useState, useMemo } from 'react';

export const useChat = (conversationId: string | null) => {
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const previousScrollHeight = useRef<number>(0);

  // Use RTK Query to fetch messages with the current page
  const { data, isFetching, isLoading, isError, refetch } = useGetMessagesQuery(
    { conversationId, page: currentPage },
    {
      skip: !conversationId,

    }
  );

  const messages = useMemo(() => data?.messages ?? [], [data]) as IMessageData[];
  const hasMore = data?.currentPage < data?.numberOfPages;

  /** Scroll to the latest message (only for new messages) */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    if (conversationId) {
      refetch(); // Manually trigger a refetch when currentPage changes
    }
  }, [currentPage, conversationId, refetch]);

  /** Load messages on initial mount */
  useEffect(() => {
    if (isFirstLoad.current && messages.length > 0) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [messages, scrollToBottom]);

  /** Handle sending a new message */
  const handleSendMessage = () => {
    // Implement message sending logic
  };

  /** Handle infinite scroll */
  const handleScroll = useCallback(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer || isFetching || !hasMore) return;

    // Check if at the top of the chat container
    if (chatContainer.scrollTop === 0) {
      // Save the current scroll height before fetching new messages
      previousScrollHeight.current = chatContainer.scrollHeight;
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }, [hasMore, isFetching]);

  /** Restore scroll position after new messages are loaded */
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer || isFetching || !previousScrollHeight.current) return;

    // Calculate the new scroll position
    const newScrollHeight = chatContainer.scrollHeight;
    const scrollOffset = newScrollHeight - previousScrollHeight.current;

    // Restore the scroll position
    chatContainer.scrollTop = scrollOffset;

    // Reset the previous scroll height
    previousScrollHeight.current = 0;
  }, [messages, isFetching]);

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
    isError,
    isLoading,
    hasMore,
    scrollToBottom
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