import { IPostDoc } from "@/data/PostData";
import React from "react";

interface Props {
  post: IPostDoc;
}
const CommentsModel: React.FC<Props> = ({ post }) => {
  console.log(post);
  return (
    <div className="mx-auto max-w-[700px] w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg bg-[#1C1C24]"></div>
    </div>
  );
};

export default CommentsModel;
