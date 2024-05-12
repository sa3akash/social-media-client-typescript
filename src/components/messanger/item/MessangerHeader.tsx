import { NameDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import UserAvater from "@/components/common/UserAvater";
import VideoCallIcon from "@/assets/images/call/ic_Video_Call.svg";
import AudioCallIcon from "@/assets/images/call/ic_Audio_Call.svg";
import MoreIcon from "@/assets/images/call/ic_more.svg";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { IMessageData } from "@/interfaces/chat.interface";

interface Props {
  setOpenCall: React.Dispatch<React.SetStateAction<string>>;
  message: IMessageData
}

const MessangerHeader:React.FC<Props> = ({setOpenCall,message}) => {

  const { onlineUsers } = useSelector((state: RootState) => state.auth);

  
 

  
  

  return (
    <div className="h-[78px] flex items-center justify-between px-4 border-b shadow">
      <div className="flex items-center gap-2">
        <Link to="/messanger" className="md:hidden"><ArrowLeft /></Link>
         {message?.receiverId && (
          <UserAvater
            src={message.user?.profilePicture}
            name={message.user?.name as NameDoc}
            className="min-w-[36px] min-h-[36px]"
            avatarColor={message.user?.avatarColor}
            authId={message.user.authId}
            />
            )}
        <h4 className="font-semibold text-[14px] md:text-[18px] tracking-[0.1px] capitalize">
          {message?.user?.name.first} {message?.user?.name.last}
        </h4>
        <div className="hidden md:block w-[2px] h-[25px] bg-[#92929D] rounded-md" />
        <span className="hidden md:block text-[#92929D] text-[12px] roboto tracking-[0.1px]">
          {onlineUsers.some((id) => id === message?.user.authId)
            ? "Online"
            : "Offline"}
        </span> 
      </div>
      <div className="flex items-center gap-4">
        <button onClick={()=>setOpenCall(prev=> !prev ? "video" : prev === "audio" ? "video" : "")}>
          <img
            src={VideoCallIcon}
            alt="videoCall"
            className="pointer-events-none"
          />
        </button>
        <button onClick={()=>setOpenCall(prev=> !prev ? "audio" : prev === "video" ? "audio" : "")}>
          <img
            src={AudioCallIcon}
            alt="audioCall"
            className="pointer-events-none"
          />
        </button>
        <button>
          <img src={MoreIcon} alt="moreIcon" className="pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default MessangerHeader;
