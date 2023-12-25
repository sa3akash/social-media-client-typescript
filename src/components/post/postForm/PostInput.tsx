import React from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";

const maxNumberOfCharacters = 100;

interface Props {
  post: string;
  bgColor: string;
}

const PostInput: React.FC<Props> = ({ bgColor, post }) => {
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
    <div
      className={cn(
        "w-full h-[80px]",
        bgColor.length &&
          "h-[350px] flex items-center justify-center text-center my-auto text-white font-bold px-4"
      )}
      style={{ backgroundColor: bgColor ? bgColor : "" }}
    >
      <div
        id={bgColor ? "bgColor" : "bgNone"}
        contentEditable={true}
        data-placeholder="What's on your mind?"
        className="w-full text-[24px] border-none outline-none overflow-y-scroll overflow-x-hidden break-all font-bold px-4"
        onInput={postInputEditable}
        onKeyDown={onKeyDown}
        ref={(el) => {
          if (el) el.textContent = post as string;
          el?.focus();
        }}
      />
    </div>
  );
};

export default PostInput;
