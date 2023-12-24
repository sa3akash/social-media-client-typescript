import React from "react";

const maxNumberOfCharacters = 100;

const CreateInput = () => {
  const postInputEditable = (e: React.FormEvent<HTMLDivElement>, context: string ) => {
    const currentTextLength = (e.target as HTMLDivElement).textContent?.length || 0;
    const counter = maxNumberOfCharacters - currentTextLength;
    console.log(counter, context);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentTextLength = (event.target as HTMLDivElement).textContent?.length;
    if (currentTextLength === maxNumberOfCharacters && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  return (
    <div className="mt-4">
      <div
        contentEditable={true}
        data-placeholder="What's on your mind?"
        className="w-full text-[24px] border-none outline-none max-h-[400px] h-[80px] overflow-y-scroll overflow-x-hidden break-all"
        onInput={(e) =>
          postInputEditable(e, e.currentTarget.textContent as string)
        }
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CreateInput;
