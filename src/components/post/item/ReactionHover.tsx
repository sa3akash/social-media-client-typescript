import { useToast } from "@/components/ui/use-toast";
import {
  IReactionDoc,
  OnlyReactionName,
} from "@/interfaces/reaction.interface";
import { api } from "@/services/http/api";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import millify from "millify";
import { PostUtils } from "@/services/utils/postUtils";

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
  const [reactionData, setReactionData] = useState([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiUrl = comment
      ? `/comments/${postId}`
      : `/post/reaction/${postId}/${reactionType}`;
    const callApi = async () => {
      setReactionData([]);
      setLoading(true);
      const data = await api.getPostReactions(apiUrl, toast);
      setReactionData(data.reactions);
      setLoading(false);
    };
    const callCommentApi = async () => {
      setReactionData([]);
      setLoading(true);
      const data = await api.getPostReactions(apiUrl, toast);
      setReactionData(data.comments);
      setLoading(false);
    };
    reactionType && callApi();
    comment && callCommentApi();
  }, [comment, postId, reactionType, toast]);

  return (
    <div className="flex flex-col items-center">
      {PostUtils.getNameForComment(reactionData)?.map(
        (reaction: IReactionDoc, index) => (
          <span key={index} className="capitalize w-full text-left">
            {reaction?.creator?.name?.first} {reaction?.creator?.name?.last}
          </span>
        )
      )}
      {loading ? (
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
