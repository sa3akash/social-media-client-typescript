import { IUserDoc, NameDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import UserAvater from "@/components/common/UserAvater";
import VideoCallIcon from "@/assets/images/call/ic_Video_Call.svg";
import AudioCallIcon from "@/assets/images/call/ic_Audio_Call.svg";
import MoreIcon from "@/assets/images/call/ic_more.svg";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import React from "react";
import useSimplePeer from "@/hooks/webrtc/useSimplePeer";

interface Props {
  userFriend: IUserDoc;
  conversationId:string | null;
}

const MessangerHeader: React.FC<Props> = ({ userFriend,conversationId }) => {
  const { onlineUsers } = useSelector((state: RootState) => state.auth);
  
  // const { sendCall } = useWebrtc();


  const { user } = useSelector((state: RootState) => state.auth);

 

  const { startCall } = useSimplePeer();

  const openCall = (isVideo: boolean) => {
    if (!user) return;
    // sendCall({
    //   friendUser: userFriend,
    //   type,
    //   user,
    //   conversationId: conversationId || '',
    // });

    startCall(user.authId,userFriend, isVideo,conversationId!)
  };

  if(!userFriend) return null;

  return (
    <div className="h-[78px] flex items-center justify-between px-4 border-b shadow">
      <div className="flex items-center gap-2">
        <Link to="/messanger" className="2xl:hidden">
          <ArrowLeft />
        </Link>
          <UserAvater
            src={userFriend.profilePicture}
            name={userFriend.name as NameDoc}
            className="min-w-[36px] min-h-[36px]"
            avatarColor={userFriend.avatarColor}
            authId={userFriend.authId}
          />
      
        <h4 className="font-semibold text-[14px] md:text-[18px] tracking-[0.1px] capitalize">
          {userFriend?.name.first} {userFriend?.name.last}
        </h4>
        <div className="hidden md:block w-[2px] h-[25px] bg-[#92929D] rounded-md" />
        <span className="hidden md:block text-[#92929D] text-[12px] roboto tracking-[0.1px]">
          {onlineUsers.some((id) => id === userFriend.authId)
            ? "Online"
            : "Offline"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => openCall(true)}>
          <img
            src={VideoCallIcon}
            alt="videoCall"
            className="pointer-events-none"
          />
        </button>
        <button onClick={() => openCall(false)}>
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
