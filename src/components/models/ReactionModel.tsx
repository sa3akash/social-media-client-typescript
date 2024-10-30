import React, { useState } from "react";
import { ReactionName } from "@/interfaces/reaction.interface";
import SingleReactionItem from "@/components/models/item/SingleReactionItem";
import { IPostDoc } from "@/interfaces/post.interface";
import { PostUtils } from "@/services/utils/postUtils";
import ReactionShow from "@/components/models/item/ReactionShow";

interface Props {
  reactionType: ReactionName;
  post: IPostDoc;
}

const ReactionModel: React.FC<Props> = ({ post, reactionType }) => {
  
  const filersReactions = PostUtils.filterReactions(post.reactions, 7);
  const [activeType, setActiveType] = useState(reactionType);

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg bg-[#1C1C24]">
        <div className="w-full flex items-center justify-center text-white p-2">
          <SingleReactionItem
            type="all"
            active={"all" === activeType}
            setActiveType={setActiveType}
            postCount={14500}
            resetAll={() => {}}
          />
          {filersReactions.slice(0, 3).map((item, index: number) => (
            <SingleReactionItem
              type={item[0]}
              active={item[0] === activeType}
              key={index}
              setActiveType={setActiveType}
              postCount={item[1]}
              resetAll={() => {}}
            />
          ))}
          {filersReactions.length > 3 && (
            <SingleReactionItem
              type="more"
              active={"more" === activeType}
              setActiveType={setActiveType}
              postCount={0}
              resetAll={() => {}}
            />
          )}
        </div>
        <ReactionShow
          activeType={activeType}
          filersReactions={filersReactions}
          postId={post._id}
          setActiveType={setActiveType}
        />
      </div>
    </div>
  );
};

export default ReactionModel;
