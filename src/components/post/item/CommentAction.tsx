import AtachmentIcon from "@/assets/images/ic_attachment.svg";
import ImojiIcon from "@/assets/images/ic_Emoticon.svg";
import ImageIcon from "@/assets/images/ic_Image.svg";
import EmojiPicker from "@/components/common/EmojiPicker";
import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  commentInputRef: React.MutableRefObject<null | HTMLInputElement>;
}

const CommentAction: React.FC<Props> = ({ commentInputRef }) => {
  const { user } = useSelector((store: RootState) => store.auth);
  return (
    <div className="px-4 py-4 flex items-center gap-4 w-full">
      <UserAvater
        src={user?.profilePicture}
        name={user?.name as NameDoc}
        className="min-w-[36px] min-h-[36px]"
        avatarColor={user?.avatarColor}
      />
      <div className="flex-1 flex gap-4 select-none h-10 w-full rounded-md border-input dark:bg-[#292932] px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:flex-row borderWrapper dark:border-[0px]">
        <input
          type="text"
          className="w-full focus:outline-none bg-transparent placeholder:roboto placeholder:text-[#92929D]"
          placeholder="Write your comment…"
          ref={commentInputRef}
        />
        <img src={AtachmentIcon} alt="atachIcon" className="w-5 icon" />
        <EmojiPicker onChange={(value: string) => console.log(value)}>
          <img src={ImojiIcon} alt="" className="w-5 icon" />
        </EmojiPicker>
        <img src={ImageIcon} alt="" className="w-5 icon" />
      </div>
    </div>
  );
};

export default CommentAction;
