import React from "react";
import UserAvater from "@/components/common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";
import { timeAgo } from "@/services/utils/timeAgo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2,MessagesSquare } from "lucide-react";
import UserHoverCard from "@/components/common/UserHoverCard";
import { useInfiniteCommant } from "@/hooks/testhook/useGetCommant";

interface Props    {
  postId: string;
}
const CommentsModel: React.FC<Props> = ({ postId }) => {

  const { commants, isFetching,lastPostRef } = useInfiniteCommant(postId)

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg bg-[#1C1C24]">
        <ScrollArea className="h-full w-full">
          {commants?.map((item, index) => (
            <div
              ref={commants?.length === index + 1 ? lastPostRef : null}
              key={index}
            >
              <SingleCommentUser item={item} />
            </div>
          ))}
          {isFetching && (
            <div className="h-full flex items-center justify-center my-6 gap-2">
              <Loader2 className="animate-spin w-10" /> Loading...
            </div>
          )}
          
          {!commants?.length && (
            <div className="h-full flex items-center justify-center my-6 gap-2">
              <MessagesSquare /> No comment found
            </div>
          )}
        </ScrollArea>
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
          authId={item?._id}
          indicator="hidden"
        />
      </div>
      <div>
        <div className="bg-muted py-2 px-4 rounded-2xl">
          <div>
            <UserHoverCard
              item={{ _id: item?.creator.authId, ...item?.creator }}
              className="capitalize font-semibold text-[14px] tracking-[0.1px] h-max"
            />
          </div>
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
