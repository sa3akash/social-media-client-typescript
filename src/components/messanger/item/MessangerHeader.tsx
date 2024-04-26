import { NameDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import UserAvater from "@/components/common/UserAvater";
import VideoCallIcon from "@/assets/images/call/ic_Video_Call.svg";
import AudioCallIcon from "@/assets/images/call/ic_Audio_Call.svg";
import MoreIcon from "@/assets/images/call/ic_more.svg";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MessangerHeader = () => {
  const { messages } = useSelector((state: RootState) => state.messanger);
  const { onlineUsers } = useSelector((state: RootState) => state.auth);


  return (
    <div className="h-[78px] flex items-center justify-between px-4 border-b shadow">
      <div className="flex items-center gap-2">
        <Link to="/messanger" className="md:hidden"><ArrowLeft /></Link>
        {messages[0]?.receiverId && (
          <UserAvater
            src={messages[0].user?.profilePicture}
            name={messages[0].user?.name as NameDoc}
            className="min-w-[36px] min-h-[36px]"
            avatarColor={messages[0].user?.avatarColor}
            authId={messages[0].user.authId}
            />
            )}
        <h4 className="font-semibold text-[14px] md:text-[18px] tracking-[0.1px] capitalize">
          {messages[0]?.user?.name.first} {messages[0]?.user?.name.last}
        </h4>
        <div className="hidden md:block w-[2px] h-[25px] bg-[#92929D] rounded-md" />
        <span className="hidden md:block text-[#92929D] text-[12px] roboto tracking-[0.1px]">
          {onlineUsers.some((id) => id === messages[0]?.user.authId)
            ? "Online"
            : "Offline"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button>
          <img
            src={VideoCallIcon}
            alt="videoCall"
            className="pointer-events-none"
          />
        </button>
        <button>
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
