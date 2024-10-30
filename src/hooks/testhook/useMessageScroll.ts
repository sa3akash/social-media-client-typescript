import { IMessageData } from "@/interfaces/chat.interface";
import { useGetMessagesQuery } from "@/store/rtk/message/message";
import { useEffect, useState } from "react";

const useMessageScroll = (conversationId: string) => {
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const { data, isFetching, isLoading, isError } = useGetMessagesQuery({
    conversationId,
    page,
  });

  useEffect(() => {
    if (data) {
      setNumberOfPages(data?.numberOfPages);
    }
  }, [data]);

  const messages:IMessageData[] = data?.messages || [];

  const loadMoreMessages = () => {
    if (isFetching) return;
    if (numberOfPages <= page) return;
    setPage((prevPage) => prevPage + 1);
  };

  return { messages, loadMoreMessages, isFetching, isLoading, isError, hasLoadMore: numberOfPages > page };
};

export default useMessageScroll;
