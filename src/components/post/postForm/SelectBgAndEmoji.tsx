import { useState } from "react";
import ColorPickerIcon from "@/assets/icons/colorPicker.png";
import EmojiPicker from "@/components/common/EmojiPicker";
import ImojiIcon from "@/assets/images/ic_emoji.svg";
import { cn } from "@/lib/utils";
import { bgColors } from "@/services/utils/map";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";

const SelectBgAndEmoji = () => {
  const [colorPicker, setColorPicker] = useState(false);
  const { post } = useSelector((state: RootState) => state.SinglePost);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 my-4 px-4">
      <img
        src={ColorPickerIcon}
        alt="picker"
        className="w-[38px] cursor-pointer select-none"
        onClick={() => setColorPicker((prev) => !prev)}
      />
      <div className="flex-1 overflow-hidden ">
        <div
          className={cn(
            "items-center gap-1 justify-around transition-all",
            colorPicker ? "flex" : "hidden"
          )}
        >
          {bgColors.map((item: string, index: number) => (
            <div
              className={cn(
                "min-w-[32px] min-h-[32px] border rounded-md cursor-pointer",
                index > 5 ? "hidden sm:block" : "block"
              )}
              style={{ backgroundColor: `${item}` }}
              key={index}
              onClick={() =>
                dispatch(updatePostItem({ bgColor: index === 0 ? "" : item }))
              }
            />
          ))}
        </div>
      </div>
      <EmojiPicker
        onChange={(value: string) =>
          dispatch(updatePostItem({ post: post + value }))
        }
      >
        <img src={ImojiIcon} alt="emoji" className="w-6 icon" />
      </EmojiPicker>
    </div>
  );
};

export default SelectBgAndEmoji;
