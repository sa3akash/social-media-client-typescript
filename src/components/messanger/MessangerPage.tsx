import MessangerBody from "@/components/messanger/MessangerBody";
import MessangerSidebar from "@/components/messanger/MessangerSidebar";
import { api } from "@/services/http/api";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MessangerPage = () => {
  useEffect(() => {
    api.getConversationCall()
  }, []);

  const [seatchParams] = useSearchParams();
  const conversationId = seatchParams.get("conversationId");

  return (
    <div className="w-full h-full flex">
      <div className="w-[350px] h-full border-r">
        <MessangerSidebar conversationId={conversationId}/>
      </div>
      <div className="flex-1 h-full">
        {conversationId && <MessangerBody />}
      </div>
    </div>
  );
};

export default MessangerPage;
