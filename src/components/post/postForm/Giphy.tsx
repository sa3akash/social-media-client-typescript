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
import useReactInfiniteScrollGiphy from "@/hooks/useReactInfiniteScrollGiphy";
import { AppDispatch } from "@/store";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  setGiphyModel: (arg: boolean) => void;
}

const Giphy: FC<Props> = ({ setGiphyModel }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const dispatch: AppDispatch = useDispatch();

  const { data, lastElementRef, loading } =
    useReactInfiniteScrollGiphy(debouncedValue);

  const handleGif = (url: string) => {
    dispatch(updatePostItem({ gifUrl: url }));
    setGiphyModel(false);
  };

  return (
    <Dialog onOpenChange={() => setGiphyModel(false)} open={true}>
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
          <ScrollArea className="h-[450px]">
            <div className="flex items-center justify-center gap-2 flex-col">
              {data.map(
                (
                  item: { images: { original: { url: string } } },
                  index: number
                ) => (
                  <div
                    className="w-full h-[300px]"
                    onClick={() =>
                      handleGif(item?.images?.original.url as string)
                    }
                    key={index}
                    ref={data.length === index + 1 ? lastElementRef : null}
                  >
                    <Image
                      src={item.images.original.url as string}
                      className="w-full h-full object-cover"
                      classNameTwo="object-cover"
                    />
                  </div>
                )
              )}
              {loading && (
                <p className="p-4 flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-6 h-6" /> Loading...
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Giphy;
