import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import React, { useState } from "react";
import UserAvater from "../common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { timeAgo } from "@/services/utils/timeAgo";
import { ScrollArea } from "../ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  postId: string;
}
const CommentsModel: React.FC<Props> = ({ postId }) => {
  const [commentsData, setCommentsData] = useState([]);

  const { lastElementRef, loading } = useInfiniteScroll(
    `/comments/${postId}`,
    (data) => {
      setCommentsData(data.comments);
    }
  );

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div
        className="w-full h-full md:rounded-lg bg-[#1C1C24]"
        ref={lastElementRef}
      >
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin w-10" />
          </div>
        ) : (
          <ScrollArea className="h-full w-full">
            {commentsData?.map((item, index) => (
              <SingleCommentUser key={index} item={item} />
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default CommentsModel;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleCommentUser = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="w-[50px]">
        <UserAvater
          src={item?.creator?.profilePicture}
          name={item?.creator?.name as NameDoc}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={item?.creator?.avatarColor}
        />
      </div>
      <div>
        <div className="bg-muted py-2 px-4 rounded-2xl">
          <Link to={`/u/${item?.creator?.authId}`} className="capitalize font-semibold text-[14px] flex items-center gap-2">
            {item?.creator?.name?.first} {item.creator?.name?.last}
          </Link>
          <span className="text-[16px] flex-1">{item?.comment}</span>
        </div>
        <div>
          <span className="text-[12px] roboto text-[#696974]">
            {timeAgo.transform(`${item?.createdAt}`)}
          </span>
        </div>
      </div>
    </div>
  );
};
