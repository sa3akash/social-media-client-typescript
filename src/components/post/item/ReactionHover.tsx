import {
  IReactionDoc,
  OnlyReactionName,
} from "@/interfaces/reaction.interface";
import { Loader2 } from "lucide-react";
import React from "react";
import millify from "millify";
import { PostUtils } from "@/services/utils/postUtils";
import { useGetReactionByTypeQuery } from "@/store/rtk/post/reactionSlice";
import { useGetCommantByPostIdQuery } from "@/store/rtk/post/commantSlice";

interface Props {
  numberOfPost: number;
  reactionType?: OnlyReactionName;
  postId: string;
  comment?: boolean;
}

export const ReactionHover: React.FC<Props> = ({
  numberOfPost,
  reactionType,
  postId,
}) => {
  const { data, isLoading } = useGetReactionByTypeQuery({
    postId,
    reactionType,
  });

  const mainData = data?.reactions || [];

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
        numberOfPost > 10 && <p>and {millify(+numberOfPost - 10)} more</p>
      )}
    </div>
  );
};

export const CommantHover = ({
  numberOfPost,
  postId,
}: {
  numberOfPost: number;
  postId: string;
}) => {
  const { data, isLoading } = useGetCommantByPostIdQuery({ postId });

  const mainData = data?.comments || [];
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
        numberOfPost > 10 && <p>and {millify(+numberOfPost - 10)} more</p>
      )}
    </div>
  );
};
