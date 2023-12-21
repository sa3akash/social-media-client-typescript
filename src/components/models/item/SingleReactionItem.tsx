import { ReactionName } from "@/interfaces/reaction.interface";
import { cn } from "@/lib/utils";
import { ReactionIconMap } from "@/services/utils/map";
import millify from "millify";
import React from "react";

interface Props {
  type: string;
  active: boolean;
  setActiveType: (type: ReactionName) => void;
  postCount: number;
}

const SingleReactionItem: React.FC<Props> = ({
  type,
  active,
  setActiveType,
  postCount
}) => {
  const reactionIcon = ReactionIconMap[
    type as keyof typeof ReactionIconMap
  ] as string;

  return (
    <button
      className={cn(
        "relative w-[80px] h-[50px] rounded-lg font-semibold text-[15px] tracking-[0.1px]  capitalize",
        active ? "text-[#1E75FF]" : "hover:bg-[#393946]"
      )}
      onClick={() => setActiveType(type as ReactionName)}
    >
      {type !== "all" && type !== "more" ? (
        <div className="flex items-center justify-center gap-1">
          <img src={reactionIcon} alt={type} className="w-6 h-6" />
          <span>{millify(postCount)}</span>
        </div>
      ) : (
        type
      )}
      {active && (
        <div className="bg-[#1E75FF] h-[6px] w-full absolute -bottom-[2px] left-0 rounded-full" />
      )}
    </button>
  );
};

export default SingleReactionItem;
