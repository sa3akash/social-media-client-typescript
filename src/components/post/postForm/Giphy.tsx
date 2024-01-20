import Image from "@/components/common/Image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/useDebounce";
import { GiphyUtils } from "@/services/utils/giphyUtils";
import { AppDispatch } from "@/store";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { ArrowLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  setGiphyModel: (arg: boolean) => void;
  giphyModel: boolean;
}

const Giphy: FC<Props> = ({ setGiphyModel, giphyModel }) => {
  const [giphyData, setGiphyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const dispatch: AppDispatch = useDispatch();

  const handleGif = (url: string) => {
    dispatch(updatePostItem({ gifUrl: url }));
    setGiphyModel(false);
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
    <Dialog onOpenChange={() => setGiphyModel(false)} open={giphyModel}>
      <DialogContent className="max-w-[500px] p-0 cardBG">
        <DialogHeader>
          <DialogTitle className="text-center mt-4 relative">
            <button
              className="absolute top-0 left-4 bottom-0 my-auto"
              onClick={() => setGiphyModel(false)}
            >
              <ArrowLeft />
            </button>
            Choose a GIF
          </DialogTitle>
        </DialogHeader>
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
                    <Image
                      src={item.images.original.url as string}
                      className="w-full h-full object-cover"
                      classNameTwo="object-cover"
                    />
                  </div>
                )
              )}
              {loading && <span>Loading...</span>}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Giphy;
