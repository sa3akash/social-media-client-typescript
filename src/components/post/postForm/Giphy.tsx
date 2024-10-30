import GiphyComponents from "@/components/common/GiphyComponents";
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
import { AppDispatch } from "@/store";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { ArrowLeft } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from 'react-responsive';

interface Props {
  setGiphyModel: (arg: boolean) => void;
}

const Giphy: FC<Props> = ({ setGiphyModel }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const dispatch: AppDispatch = useDispatch();

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
              
            <GiphyComponents selectImage={(gif,e)=>{
                e.preventDefault();
                dispatch(updatePostItem({ gifUrl: gif.images?.original?.url }));
                setGiphyModel(false);
              }} searchTerm={debouncedValue} columns={isMobile ? 1 : 2} width={isMobile ? 250 : 400}/>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Giphy;
