import MessangerHeader from "@/components/messanger/item/MessangerHeader";
import MessangerInput from "@/components/messanger/item/MessangerInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
// import CallingAudioVideo from "@/components/messanger/item/CallingAudioVideo";
import { ElementRef, useEffect, useRef, useState } from "react";
import { IMessageData } from "@/interfaces/chat.interface";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/http";
import SingleMessage from "./item/SingleMessage";
import { Utils } from "@/services/utils/utils";
import useChatSocket from "@/services/socket/useChatSocket";
import Call from "./call/Call";
import {} from "@/interfaces/auth.interface";
import useWebrtc from "@/hooks/webrtc/useWebrtc";

const MessangerBody = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { isCalling } = useWebrtc();

  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  const [gif, setGif] = useState<string>("");

  // const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data: mainData } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data } = await api.get(`/chat/messagess/${conversationId}`);
      return data.messages as IMessageData[];
    },
    staleTime: 1000,
  });

  // const { fetchNextPage, hasNextPage, data, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["messages", conversationId],
  //     queryFn: async ({ pageParam = 1 }) => {
  //       const { data } = await api.get(
  //         `/chat/messagess/${conversationId}?page=${pageParam}`
  //       );
  //       return data;
  //     },
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage) => {
  //       if (lastPage.currentPage < lastPage.numberOfPages) {
  //         return lastPage.currentPage + 1;
  //       }
  //       return undefined;
  //     },
  //     staleTime: 1000 * 60,
  //   });

  // const mainData = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.messages];
  // }, []) as IMessageData[];

  // useChatScroll({
  //   bottomRef,
  //   chatRef,
  //   loadMore: fetchNextPage,
  // });

  useChatSocket({ messages: mainData });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mainData]);

  if (!mainData?.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <MessangerHeader message={mainData[0]} />
      <div className="flex-1 flex flex-col h-full lg:flex-row gap-4">
        {isCalling && (
          <div className="flex-1">
            <Call />
          </div>
        )}
        <div className="flex-1 border flex flex-col ">
          <div className="flex-1 flex flex-col relative ">
            <ScrollArea className="h-full w-full" id="scrollOverHight">
              <div className="flex flex-col gap-4 h-full px-0 py-4 md:p-4">
                <div className="flex-1"></div>
                {mainData.map((message, index) => (
                  <SingleMessage
                    item={message}
                    wonMessage={user?.authId === message.senderId}
                    multipleMessage={
                      index > 0 &&
                      message.senderId === mainData[index - 1].senderId
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
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {gif && (
              <div className="absolute bottom-0 left-0 w-full h-[150px]">
                <div className="w-[150px] h-full relative group">
                  <img
                    src={gif}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <X
                    className="w-5 h-5 absolute top-2 right-2 cursor-pointer z-10 hidden group-hover:block transition-all"
                    onClick={() => setGif("")}
                  />
                </div>
              </div>
            )}
          </div>
          <MessangerInput setGif={setGif} gif={gif} />
        </div>
      </div>
    </div>
  );
};

export default MessangerBody;
