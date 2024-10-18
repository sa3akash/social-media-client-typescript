import MessangerBody from "@/components/messanger/MessangerBody";
import MessangerSidebar from "@/components/messanger/MessangerSidebar";
import { useSocket } from "@/hooks/useSocket";
import { IMessageData } from "@/interfaces/chat.interface";
import { cn } from "@/lib/utils";
import { getConversations } from "@/services/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MessangerPage = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await getConversations();
      return data.conversationList;
    },
    staleTime: 1000 * 6,
  });

  const [searchParams] = useSearchParams();

  const conversationId = searchParams.get("conversationId");

  useEffect(() => {
    socket?.on("chat-list", (data: IMessageData) => {
      const conversationCache = queryClient.getQueryData([
        "conversations",
      ]) as IMessageData[];
      const newData = [...conversationCache].filter(
        (i) => i.conversationId !== data.conversationId
      );
      queryClient.setQueryData(["conversations"], [data, ...newData]);
    });

    return () => {
      socket?.off("chat-list");
    };
  }, [queryClient, socket]);

  return (
    <div className="w-full h-full flex">
      <div
        className={cn(
          "w-full 2xl:w-[350px] h-full border-r",
          conversationId ? "hidden 2xl:block" : ""
        )}
      >
        <MessangerSidebar conversations={query.data} />
      </div>
      <div className="flex-1 h-full">
        {conversationId ? <MessangerBody /> : <NoSelectConversation />}
      </div>
    </div>
  );
};

export default MessangerPage;

const NoSelectConversation = () => {
  return (
    <div
      className="flex
        items-center justify-center h-full gap-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-square-x w-[100px] h-[100px]"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="m14.5 7.5-5 5" />
        <path d="m9.5 7.5 5 5" />
      </svg>

      <h3 className="text-2xl">Select a conversation</h3>
    </div>
  );
};
