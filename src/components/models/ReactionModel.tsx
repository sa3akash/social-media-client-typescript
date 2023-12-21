import { IPostDoc } from "@/data/PostData";
import React, { useState } from "react";
import { IReactionDoc, ReactionName } from "@/interfaces/reaction.interface";
import SingleReactionItem from "@/components/models/item/SingleReactionItem";
import { NumberOfReaction, reactionData } from "@/data/ReactionData";
import SingleReactionData from "@/components/models/item/SingleReactionData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  reactionType: ReactionName;
  post: IPostDoc;
}

const ReactionModel: React.FC<Props> = ({ post, reactionType }) => {
  const [activeType, setActiveType] = useState(reactionType);

  console.log(post);

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg bg-[#1C1C24]">
        <div className="w-full flex items-center justify-center text-white p-2">
          <SingleReactionItem
            type="all"
            active={"all" === activeType}
            setActiveType={setActiveType}
            postCount={14500}
          />
          {NumberOfReaction.slice(0, 3).map((item, index: number) => (
            <SingleReactionItem
              type={item.type}
              active={item.type === activeType}
              key={index}
              setActiveType={setActiveType}
              postCount={2001}
            />
          ))}
          <SingleReactionItem
            type="more"
            active={"more" === activeType}
            setActiveType={setActiveType}
            postCount={1520}
          />
        </div>
        <div className="w-full text-white my-2 h-[calc(100%-65px)] ">
          <ScrollArea className="h-full w-full">
            <div className=" w-full flex flex-col gap-0 p-2">
              {reactionData.map((item: IReactionDoc, index: number) => (
                <SingleReactionData
                  key={index}
                  reaction={item}
                  active={false}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ReactionModel;
