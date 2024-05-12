import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IReactionDoc,
  OnlyReactionName,
  ReactionName,
} from "@/interfaces/reaction.interface";
import React from "react";
import SingleReactionData from "@/components/models/item/SingleReactionData";
import { ReactionIconMap, reactionColorMap } from "@/services/utils/map";
import { Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPostReaction } from "@/services/http";

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
  const notAtAll = activeType !== "more" && activeType !== "all";

  const apiUrl =
    activeType && notAtAll
      ? `/post/reaction/${postId}/${activeType}`
      : `/post/reactions/${postId}`;

  const { data, isLoading } = useQuery({
    queryKey: ["reactions", postId, activeType],
    queryFn: () => getPostReaction(apiUrl),
    staleTime: 1000 * 60,
  });

  const reactionsData: IReactionDoc[] = data?.data.reactions || [];

  return (
    <div className="w-full text-white my-2 h-[calc(100%-65px)] ">
      <ScrollArea className="relative h-full w-full">
        <div className="w-full h-full flex flex-col gap-0 p-2">
          {reactionsData.length > 0 &&
            reactionsData.map((item, index) => (
              <SingleReactionData key={index} reaction={item} active={false} />
            ))}
          {isLoading && (
            <p className="w-full text-center text-[18px] pb-4">Loading...</p>
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
