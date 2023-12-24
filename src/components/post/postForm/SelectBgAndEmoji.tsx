import { useState } from "react";
import ColorPickerIcon from "@/assets/icons/colorPicker.png";
import EmojiPicker from "@/components/common/EmojiPicker";
import ImojiIcon from "@/assets/images/ic_Emoticon.svg";
import { cn } from "@/lib/utils";
import { bgColors } from "@/services/utils/map";

const SelectBgAndEmoji = () => {
  const [colorPicker, setColorPicker] = useState(false);

  return (
    <div className="flex items-center gap-1 my-4">
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
         
        
          {
            bgColors.map((item:string,index:number)=>(
              <div className={cn('min-w-[32px] min-h-[32px] border rounded-md cursor-pointer', index > 5 ? 'hidden sm:block':'block')}
              style={{backgroundColor: `${item}`}} key={index}/>
            ))
          }
          
        </div>
      </div>
      <EmojiPicker onChange={(value: string) => console.log(value)}>
        <img src={ImojiIcon} alt="" className="w-6 icon" />
      </EmojiPicker>
    </div>
  );
};

export default SelectBgAndEmoji;
