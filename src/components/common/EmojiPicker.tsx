import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onChange: (value: string) => void;
  children: React.ReactNode;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onChange,children }) => {
  const theme = "dark";

  return (
    <Popover>
      <PopoverTrigger>
        {/* <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" /> */}
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none w-full"
      >
        <Picker
          theme={theme}
          data={data}
          onEmojiSelect={(emoji: { native: string }) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
