import {
  IReactionDoc,
  OnlyReactionName,
} from "@/interfaces/reaction.interface";
import { Loader2 } from "lucide-react";
import React from "react";
import millify from "millify";
import { PostUtils } from "@/services/utils/postUtils";
import { useQuery } from "@tanstack/react-query";
import { getPostReaction } from "@/services/http";

interface Props {
  numberOfPost: number;
  reactionType?: OnlyReactionName;
  postId: string;
  comment?: boolean;
}

const ReactionHover: React.FC<Props> = ({
  numberOfPost,
  reactionType,
  postId,
  comment,
}) => {
  const apiUrl = comment
    ? `/comments/${postId}`
    : `/post/reaction/${postId}/${reactionType}`;

  const { data, isLoading } = useQuery({
    queryKey: ["reactions", postId, reactionType, comment],
    queryFn: () => getPostReaction(apiUrl),
    staleTime: 1000 * 60,
  });

  const mainData = data?.data.reactions || data?.data.comments || [];

  return (
    <div className="flex flex-col items-center">
      {PostUtils.getNameForComment(mainData).map(
        (reaction: IReactionDoc, index) => (
          <span key={index} className="capitalize w-full text-left">
            {reaction?.creator?.name?.first} {reaction?.creator?.name?.last}
          </span>
        )
      )}
      {isLoading ? (
        <p className="p-4 flex items-center justify-center">
          <Loader2 className="animate-spin w-5 h-5" />
        </p>
      ) : (
        numberOfPost > 10 && <p>and {millify(numberOfPost - 10)} more</p>
      )}
    </div>
  );
};

export default ReactionHover;
