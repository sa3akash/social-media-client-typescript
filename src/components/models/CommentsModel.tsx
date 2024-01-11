import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import React, { useState } from "react";
import UserAvater from "../common/UserAvater";
import { NameDoc } from "@/interfaces/auth.interface";

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

  console.log(loading);

  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div
        className="w-full h-full md:rounded-lg bg-[#1C1C24]"
        ref={lastElementRef}
      >
        {commentsData?.map((item, index) => (
          <SingleCommentUser key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CommentsModel;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SingleCommentUser = ({ item }: { item: any }) => {
  console.log(item.creator);
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="w-[50px]">
        <UserAvater
          src={item?.creator?.profilePicture}
          name={item?.creator?.name as NameDoc}
          className="min-w-[36px] min-h-[36px]"
          avatarColor={item?.creator?.avatarColor}
        />
      </div>
      <div className="bg-muted py-2 px-4 rounded-full">
        <h4 className="capitalize font-semibold text-[14px] flex items-center gap-2">
          {item?.creator?.name?.first} {item.creator?.name?.last}
        </h4>
        <span className="text-[16px] flex-1">{item?.comment}</span>
      </div>
    </div>
  );
};
