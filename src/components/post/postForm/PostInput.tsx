import React from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { PostUtils } from "@/services/utils/postUtils";

const maxNumberOfCharacters = 100;

interface Props {
  post: string;
  bgColor: string;
  className?: string;
  className2?: string;
}

const PostInput: React.FC<Props> = ({
  bgColor,
  post,
  className,
  className2,
}) => {
  // dispatch
  const dispatch: AppDispatch = useDispatch();
  // handle functions
  const postInputEditable = (e: React.FormEvent<HTMLDivElement>) => {
    const text = (e.target as HTMLDivElement).textContent;
    // const currentTextLength = text?.length || 0;
    // const counter = maxNumberOfCharacters - currentTextLength;
    // console.log(counter, text);
    dispatch(updatePostItem({ post: text as string }));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentTextLength = (event.target as HTMLDivElement).textContent
      ?.length;
    if (
      currentTextLength === maxNumberOfCharacters &&
      event.key !== "Backspace"
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full h-[80px]",
          bgColor.length &&
            "h-[250px] md:h-[320px] flex items-center justify-center text-center my-auto text-white font-bold px-4",
          className
        )}
        style={{ backgroundColor: bgColor ? bgColor : "" }}
      >
        <div
          id={bgColor ? "bgColor" : "bgNone"}
          contentEditable={true}
          data-placeholder="What's on your mind?"
          className={cn(
            "w-full border-none outline-none overflow-y-scroll overflow-x-hidden break-all font-bold px-4 placeholder:text-[14px] md:placeholder:text-[20px]",
            bgColor ? "text-[16px] md:text-[24px]" : "text-[16px] md:text-[18px]",
            className2
          )}
          onInput={postInputEditable}
          onKeyDown={onKeyDown}
          ref={(el) => {
            if (el) el.textContent = post as string;
            el?.focus();
            PostUtils.positionCursor(el);
          }}
        />
      </div>
    </>
  );
};

export default PostInput;
