import { IPostDoc } from "@/interfaces/post.interface";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  item: IPostDoc;
}

const PostText: React.FC<Props> = ({ item }) => {
  return (
    <div
      className={cn(
        "text-[14px] tracking-[0.1px] leading-6 px-4 pb-4",
        item.files.length === 0 && !item.gifUrl && "text-[24px]",
        !item.bgColor && item.files.length === 0 && !item.gifUrl && "h-[100px]",
        item.bgColor && !item.gifUrl &&
          "h-[320px] md:h-[500px] flex text-[30px] items-center justify-center text-center my-auto text-white font-bold px-4",
        
      )}
      style={{ backgroundColor: item.bgColor && !item.gifUrl ? item.bgColor : "" }}
    >
      {item.post}
    </div>
  );
};

export default PostText;
