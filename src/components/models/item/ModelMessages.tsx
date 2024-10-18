import SingleMessage from "@/components/messanger/item/SingleMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMessageData } from "@/interfaces/chat.interface";
import api from "@/services/http";
import { Utils } from "@/services/utils/utils";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ElementRef, FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

interface Props {
  conversationId: string;
}

const ModelMessages: FC<Props> = ({ conversationId }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const bottomRef = useRef<ElementRef<"div">>(null);

  // const { data, loading, lastElementRef } = useReactInfiniteScroll({
  //   baseURL: `messanges/user/${receiverId}`,
  //   fn: async ({ pageParam }) => {
  //     const response = await api.get(
  //       `/chat/messages/receiverId/${receiverId}?page=${pageParam}`
  //     );
  //     return response.data;
  //   },
  // });

  // const mainData = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.messages];
  // }, []) as IMessageData[];

  // if (!mainData) {
  //   return null;
  // }

  const { data: mainData, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await api.get(`/chat/messagess/${conversationId}`);
      return data.messages as IMessageData[];
    },
    staleTime: 1000,
    retry: 0,
  });


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mainData]);

  if (!mainData?.length) {
    return null;
  }

  return (
    <div className="flex-1">
      <ScrollArea className="h-full w-full" id="scrollOverHight">
        <div className="flex flex-col gap-4 h-full px-0 py-4 md:p-4">
          <div className="flex-1"></div>
          {mainData?.map((message, index) => (
            <SingleMessage
              item={message}
              wonMessage={user?.authId === message.senderId}
              multipleMessage={
                index > 0 && message.senderId === mainData[index - 1].senderId
              }
              separatorDate={
                index > 0 &&
                !Utils.checkDateSame(
                  mainData[index - 1].createdAt,
                  message.createdAt
                )
              }
              key={index}
              lastMessage={index + 1 === mainData.length}
            />
          ))}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
      {isLoading && (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6" />
        </p>
      )}
    </div>
  );
};

export default ModelMessages;
