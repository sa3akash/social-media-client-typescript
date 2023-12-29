import ImageVideoIcon from "@/assets/icons/imageIcon.png";
import TagFriendsIcon from "@/assets/icons/tagFriendIcon.png";
import FeelingsIcon from "@/assets/icons/feelingsICon.png";
import LocationsIcon from "@/assets/icons/locationIcon.png";
import GifIcon from "@/assets/icons/gifIcon.png";
import FeelingsModel from "./FeelingsModel";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { ImageUtils } from "@/services/utils/imageUtils";
import { useToast } from "@/components/ui/use-toast";
import Giphy from "./Giphy";

interface Props {
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const AddToUserPost: FC<Props> = ({ setFiles }) => {
  const feelingModelRef = useRef(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [modelOpen, setModelOpen] = useDetectOutsideClick(
    feelingModelRef,
    false
  );

  const [giphyModel, setGiphyModel] = useState(false);

  const { toast } = useToast();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files) {
      const errorMessage = ImageUtils.checkFile(Array.from(files));
      errorMessage
        ? toast({
            variant: "destructive",
            description: errorMessage,
          })
        : setFiles(Array.from(files));
    }
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2 border rounded-md">
        <h3 className="select-none text-[15px] font-semibold">
          Add to your post
        </h3>
        <div className="flex items-center gap-0">
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            onClick={() => imageRef.current?.click()}
          >
            <img src={ImageVideoIcon} alt="image" />
            <input
              type="file"
              ref={imageRef}
              multiple
              hidden
              onChange={onChangeImage}
              accept="image/*,video/*"
            />
          </div>
          <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
            <img src={TagFriendsIcon} alt="image" />
          </div>
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            ref={feelingModelRef}
            onClick={() => setModelOpen((prev) => !prev)}
          >
            <img src={FeelingsIcon} alt="image" />
            {modelOpen && <FeelingsModel />}
          </div>
          <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
            <img src={LocationsIcon} alt="image" />
          </div>
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            onClick={() => setGiphyModel(true)}
          >
            <img src={GifIcon} alt="image" />
          </div>
          <Giphy setGiphyModel={setGiphyModel} giphyModel={giphyModel} />
        </div>
      </div>
    </div>
  );
};

export default AddToUserPost;
