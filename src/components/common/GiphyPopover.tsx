import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/useDebounce";
import { GiphyUtils } from "@/services/utils/giphyUtils";
import { FC, ReactNode, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  children: ReactNode;
  fn:(url:string)=>void;
}

const GiphyPopover: FC<Props> = ({ children,fn }) => {
  const [giphyData, setGiphyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const handleGif = (url: string) => {
    fn(url)
  };
  useEffect(() => {
    // Make API call when debouncedValue changes
    if (debouncedValue) {
      GiphyUtils.searchGifs(debouncedValue, setGiphyData, setLoading);
    }
  }, [debouncedValue]);

  useEffect(() => {
    GiphyUtils.getTrendingGifs(setGiphyData, setLoading);
  }, []);

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
              {giphyData.map(
                (item: { images: { original: { url: string } } }, index) => (
                  <div
                    className="w-full h-[300px]"
                    onClick={() =>
                      handleGif(item.images.original.url as string)
                    }
                    key={index}
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
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GiphyPopover;
