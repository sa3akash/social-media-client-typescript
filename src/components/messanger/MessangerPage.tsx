import MessangerBody from "@/components/messanger/MessangerBody";
import MessangerSidebar from "@/components/messanger/MessangerSidebar";
import useChatSocket from "@/hooks/socket/useChatSocket";
import { cn } from "@/lib/utils";
import { useGetConversationQuery } from "@/store/rtk/message/message";
import { useSearchParams } from "react-router-dom";

const MessangerPage = () => {
  
  useChatSocket();

  const { data } = useGetConversationQuery("");

  const [searchParams] = useSearchParams();

  const conversationId = searchParams.get("conversationId");

  return (
    <div className="w-full h-full flex">
      <div
        className={cn(
          "w-full xl:max-w-[350px] h-full border-r",
          conversationId ? "hidden xl:block" : ""
        )}
      >
        <MessangerSidebar conversations={data?.conversationList} />
      </div>
      <div className="flex-1 h-full">
        {conversationId ? (
          <MessangerBody />
        ) : (
          <NoSelectConversation />
        )}
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
