import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { IUserDoc, userData } from "@/data/AddStoryData";
import Image from "@/components/common/Image";

const SujestedFriends = () => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);

  return (
    <div className="cardBG rounded-lg relative w-full">

      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">Suggested Friends</h3>
        <div
          className={cn(
            "w-7 h-4 rounded-full grid place-items-center cursor-pointer select-none",
            openModel && "borderColor"
          )}
          onClick={() => setOpenModel!((prev) => !prev)}
          ref={docRef}
        >
          <img src={MoreDot} alt="dot" />
        </div>
      </div>


      <Separator />

      <div className="px-4 py-4 flex flex-col w-full items-center gap-4">
        {userData.map((u, i) => (
          <SingleFriend key={i} item={u} />
        ))}
      </div>
    </div>
  );
};

export default SujestedFriends;

const SingleFriend = ({ item }: { item: IUserDoc }) => {
  return (
    <div className="w-full flex items-center gap-4">
      <div
        className={cn(
          "w-14 h-14 rounded-full overflow-hidden border-[2px]",
          item.avatarColor && `border-[${item.avatarColor}]`
        )}
      >
        <Image src={item.profilePicture} />
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] tracking-[0.2px] capitalize">{`${item.name.first} ${item.name.last}`}</span>
        <span className="text-[12px] text-[#696974]">02/05/2001 at 10:20PM</span>
      </div>
    </div>
  );
};
