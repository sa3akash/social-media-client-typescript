import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import MoreDot from "@/assets/images/ic_More_3_dot.svg";
import { userData } from "@/data/AddStoryData";
import { Plus } from "lucide-react";
import SingleStoryItem from "@/components/card/item/SingleStoryItem";
import { cn } from "@/lib/utils";

const StoryCard = () => {
  const docRef = useRef(null);
  const [openModel, setOpenModel] = useDetectOutsideClick(docRef, false);

  return (
    <div className="cardBG rounded-lg relative w-full">
      <div className="flex items-center justify-between px-4 py-4 ">
        <h3 className="text-[14px] tracking-[0.1px]">Stories</h3>
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
        <div className="flex cursor-pointer w-full items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-full overflow-hidden flex items-center justify-center">
            <Plus className="text-[#0062FF]" size={40} />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] tracking-[0.2px]">Add Story</span>
            <span className="text-[12px] text-[#696974]">
              Click button beside to create yours.
            </span>
          </div>
        </div>
        {userData.map((u, i) => (
          <SingleStoryItem key={i} item={u} />
        ))}
      </div>
    </div>
  );
};

export default StoryCard;
