import Image from "@/components/common/Image";
import AtachmentIcon from "@/assets/images/ic_attachment.svg"
import ImojiIcon from "@/assets/images/ic_Emoticon.svg"
import ImageIcon from "@/assets/images/ic_Image.svg"

const profileImage =
  "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


interface Props {
  commentInputRef: React.MutableRefObject<null|HTMLInputElement>;
}


const CommentAction:React.FC<Props> = ({commentInputRef}) => {
  return (
    <div className="px-4 py-4 flex items-center gap-4 w-full">
      <div className="w-9 h-9 rounded-full overflow-hidden">
        <Image src={profileImage} />
      </div>
      <div className="flex-1 flex gap-4 select-none h-10 w-full rounded-md border-input dark:bg-[#292932] px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:flex-row borderWrapper dark:border-[0px]">
        <input
          type="text"
          className="w-full focus:outline-none bg-transparent placeholder:roboto placeholder:text-[#92929D]"
          placeholder="Write your comment…"
          ref={commentInputRef}
        />
        <img src={AtachmentIcon} alt="" className="w-5 icon"/>
        <img src={ImojiIcon} alt="" className="w-5 icon"/>
        <img src={ImageIcon} alt="" className="w-5 icon"/>
      </div>
    </div>
  );
};

export default CommentAction;
