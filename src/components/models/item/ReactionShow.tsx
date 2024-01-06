import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IReactionDoc,
  OnlyReactionName,
  ReactionName,
} from "@/interfaces/reaction.interface";
import React, { useEffect, useState } from "react";
import SingleReactionData from "@/components/models/item/SingleReactionData";
import { ReactionIconMap, reactionColorMap } from "@/services/utils/map";
import { Check } from "lucide-react";
import { api } from "@/services/http/api";
import { useToast } from "@/components/ui/use-toast";

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
  const [reactionData, setReactionData] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const apiUrl =
    activeType && activeType !== "all"
      ? `/post/reaction/${postId}/${activeType}`
      : `/post/reactions/${postId}`;

  useEffect(() => {
    const callApi = async () => {
      setReactionData([]);
      setLoading(true);
      const data = await api.getPostReactions(apiUrl, toast);
      setReactionData(data.reactions);
      setLoading(false);
    };
    activeType !== "more" && callApi();
  }, [activeType, apiUrl, toast]);

  return (
    <div className="w-full text-white my-2 h-[calc(100%-65px)] ">
      <ScrollArea className="relative h-full w-full">
        <div className="w-full h-full flex flex-col gap-0 p-2">
          {reactionData.length > 0 &&
            reactionData.map((item: IReactionDoc, index: number) => (
              <SingleReactionData key={index} reaction={item} active={false} />
            ))}
          {loading && (
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
