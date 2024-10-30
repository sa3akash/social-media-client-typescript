import { ScrollArea } from "@/components/ui/scroll-area";
import {
  OnlyReactionName,
  ReactionName,
} from "@/interfaces/reaction.interface";
import React from "react";
import SingleReactionData from "@/components/models/item/SingleReactionData";
import { ReactionIconMap, reactionColorMap } from "@/services/utils/map";
import { Check, Loader2 } from "lucide-react";
import { useInfinitePostReactions } from "@/hooks/testhook/useGetPostReactions";

interface Props {
  activeType: ReactionName;
  filersReactions: [string, number][];
  setActiveType: (type: ReactionName) => void;
  postId: string;
}

const ReactionShow: React.FC<Props> = ({
  activeType,
  filersReactions,
  setActiveType,
  postId,
}) => {
  const { reactions, isFetching, lastPostRef } = useInfinitePostReactions(
    postId,
    activeType
  );

  return (
    <div className="w-full text-white my-2 h-[calc(100%-65px)] ">
      <ScrollArea className="relative h-full w-full">
        <div className="w-full h-full flex flex-col gap-0 p-2">
          {reactions.length > 0 &&
            reactions.map((item, index) => (
              <SingleReactionData
                key={index}
                reaction={item}
                ref={reactions.length === index + 1 ? lastPostRef : undefined}
              />
            ))}
          {isFetching && (
            <div className="h-full flex items-center justify-center my-6 gap-2">
              <Loader2 className="animate-spin w-10" /> Loading...
            </div>
          )}
        </div>
        {activeType === "more" && (
          <div className="w-[200px] bg-[#292932] absolute top-0 right-24 rounded-lg">
            {filersReactions.slice(3, 7).map((item, index) => (
              <div
                className="flex items-center justify-between gap-1 py-3 w-[60%] mx-auto"
                key={index}
                onClick={() => setActiveType(item[0] as OnlyReactionName)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={ReactionIconMap[item[0] as OnlyReactionName]}
                    alt={item[0]}
                    className="w-6 h-6"
                  />
                  <span
                    style={{
                      color: reactionColorMap[item[0] as OnlyReactionName],
                    }}
                  >
                    {item[1]}
                  </span>
                </div>
                {item[0] === activeType && <Check className="w-5" />}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ReactionShow;
