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
import useReactInfiniteScrollGiphy from "@/hooks/useReactInfiniteScrollGiphy";

interface Props {
  children: ReactNode;
  fn: (url: string) => void;
}

const GiphyPopover: FC<Props> = ({ children, fn }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const { data, lastElementRef, loading } =
    useReactInfiniteScrollGiphy(debouncedValue);

  console.log(data);

  const handleGif = (url: string) => {
    fn(url);
  };
  console.log("running");

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className=" p-0 cardBG" sideOffset={40}>
        <div className="text-center mt-4 relative">Choose a GIF</div>
        <Separator />
        <div className="relative h-[500px]">
          <div className="border pb-2">
            <Input
              placeholder="Search gif"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <ScrollArea className="h-full w-full">
            <div className="flex items-center justify-center gap-2 flex-col">
              {data.map(
                (
                  item: { images: { original: { url: string } } },
                  index: number
                ) => (
                  <div
                    className="w-full h-[300px]"
                    onClick={() =>
                      handleGif(item.images.original.url as string)
                    }
                    key={index}
                    ref={data.length === index + 1 ? lastElementRef : null}
                  >
                    <img
                      src={item.images.original.url as string}
                      className="w-full h-full object-cover"
                      // classNameTwo="object-cover"
                    />
                  </div>
                )
              )}
              {loading && <span>Loading...</span>}
              <div ref={lastElementRef}></div>
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GiphyPopover;
