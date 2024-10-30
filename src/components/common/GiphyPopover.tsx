import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/useDebounce";

import { FC, ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GiphyComponents from "./GiphyComponents";

interface Props {
  children: ReactNode;
  fn: (url: string) => void;
}

const GiphyPopover: FC<Props> = ({ children, fn }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className=" p-0 cardBG" sideOffset={40}>
        <div className="text-center mt-4 relative">Choose a GIF</div>
        <Separator />
        <div className="relative">
          <div className="border pb-2">
            <Input
              placeholder="Search gif"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[450px] w-full">
            <div className="flex items-center justify-center gap-2 flex-col">
              
              <GiphyComponents selectImage={(gif,e)=>{
                e.preventDefault();
                fn(gif.images?.original?.url);
              }} searchTerm={debouncedValue} />
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GiphyPopover;
