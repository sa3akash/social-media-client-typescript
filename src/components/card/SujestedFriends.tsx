import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import CardSkeleton from "@/components/card/skeleton/CardSkeleton";
import SingleSuggestedFriend from "@/components/card/item/SingleSuggestedFriend";

import { useGetSuggestedFriendsQuery } from "@/store/rtk/friends/friendsSlice";
import { IFollowerDoc } from "@/interfaces/auth.interface";

const SujestedFriends = () => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);

  const { data, isLoading } = useGetSuggestedFriendsQuery(1);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const mainData: IFollowerDoc[] = data?.users || ([] as IFollowerDoc[]);

  return (
    <div
      className={cn(
        "cardBG rounded-lg relative w-full",
        data?.length === 0 && "hidden"
      )}
    >
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
        {mainData?.map((u, i) => <SingleSuggestedFriend key={i} item={u} />)}
      </div>
    </div>
  );
};

export default SujestedFriends;
