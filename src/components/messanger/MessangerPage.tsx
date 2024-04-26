import MessangerBody from "@/components/messanger/MessangerBody";
import MessangerSidebar from "@/components/messanger/MessangerSidebar";
import { cn } from "@/lib/utils";
import { api } from "@/services/http/api";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const MessangerPage = () => {
  useEffect(() => {
    api.getConversationCall()
  }, []);


  const [searchParams] = useSearchParams()


  return (
    <div className="w-full h-full flex">
      <div className={cn("w-full md:w-[350px] h-full border-r",
      searchParams.get('receiverId') ? "hidden md:block" : ""
      
      )}>
        <MessangerSidebar />
      </div>
      <div className="flex-1 h-full">
        {searchParams.get("receiverId") && <MessangerBody />}
      </div>
    </div>
  );
};

export default MessangerPage;
