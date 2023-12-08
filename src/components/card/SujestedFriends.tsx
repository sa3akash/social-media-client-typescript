import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { suggestedFriendFn } from "@/services/http";
import CardSkeleton from "./skeleton/CardSkeleton";
import { IUserDoc } from "@/interfaces/auth.interface";
import SingleSuggestedFriend from "@/components/card/item/SingleSuggestedFriend";

const SujestedFriends = () => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);


  // if (isLoading) {
  //   return <CardSkeleton />;
  // }

  const mainSuggestedFriend = []

  return (
    <div className={cn("cardBG rounded-lg relative w-full", mainSuggestedFriend.length === 0 && 'hidden')}>
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
        {mainSuggestedFriend.map((u, i) => (
          <SingleSuggestedFriend key={i} item={u} />
        ))}
      </div>
    </div>
  );
};

export default SujestedFriends;
