import MessangerBody from "@/components/messanger/MessangerBody";
import MessangerSidebar from "@/components/messanger/MessangerSidebar";
import { api } from "@/services/http/api";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MessangerPage = () => {
  useEffect(() => {
    api.getConversationCall()
  }, []);

  const {selectedConversation} = useSelector((state:RootState)=>state.messanger)

  return (
    <div className="w-full h-full flex">
      <div className="w-[350px] h-full border-r">
        <MessangerSidebar />
      </div>
      <div className="flex-1 h-full">
        {selectedConversation?.receiverId && <MessangerBody />}
      </div>
    </div>
  );
};

export default MessangerPage;
