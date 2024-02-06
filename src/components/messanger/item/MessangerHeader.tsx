import { NameDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import UserAvater from "@/components/common/UserAvater";
import VideoCallIcon from "@/assets/images/call/ic_Video_Call.svg";
import AudioCallIcon from "@/assets/images/call/ic_Audio_Call.svg";
import MoreIcon from "@/assets/images/call/ic_more.svg";
import { useSearchParams } from "react-router-dom";

const MessangerHeader = () => {
  const { conversations } = useSelector((state: RootState) => state.messanger);
  const { user } = useSelector((state: RootState) => state.auth);

  const [seatchParams] = useSearchParams();
  const conversationId = seatchParams.get("conversationId");

  const conversationDocument = conversations.find(c=>c.conversationId === conversationId)

  const userFriend = user?.authId === conversationDocument?.senderObject._id ? conversationDocument?.receiverObject : conversationDocument?.senderObject

  return (
    <div className="h-[78px] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {userFriend && <UserAvater
          src={userFriend?.profilePicture}
          name={userFriend?.name as NameDoc}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={userFriend?.avatarColor}
        />}
        <h4 className="font-semibold text-[18px] tracking-[0.1px] capitalize">
          {userFriend?.name.first} {userFriend?.name.last}
        </h4>
        <div className="w-[2px] h-[25px] bg-[#92929D] rounded-md" />
        <span className="text-[#92929D] text-[12px] roboto tracking-[0.1px]">
          Online
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
