import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "@/hooks/useTheme";

interface EmojiPickerProps {
  onChange: (value: string) => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onChange,
  children,
  side = "top",
}) => {
  const { theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent
        side={side}
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
