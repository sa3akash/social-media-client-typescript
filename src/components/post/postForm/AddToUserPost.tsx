import ImageVideoIcon from "@/assets/icons/imageIcon.png";
import TagFriendsIcon from "@/assets/icons/tagFriendIcon.png";
import FeelingsIcon from "@/assets/icons/feelingsICon.png";
import LocationsIcon from "@/assets/icons/locationIcon.png";
import GifIcon from "@/assets/icons/gifIcon.png";
import FeelingsModel from "@/components/post/postForm/FeelingsModel";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import {FC, useRef, useState } from "react";
import Giphy from "@/components/post/postForm/Giphy";

interface Props {
  setOpenSelectFile: React.Dispatch<React.SetStateAction<boolean>>
}

const AddToUserPost:FC<Props> = ({setOpenSelectFile}) => {
  const feelingModelRef = useRef(null);
  const [modelOpen, setModelOpen] = useDetectOutsideClick(
    feelingModelRef,
    false
  );

  const [giphyModel, setGiphyModel] = useState(false);



  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2 border rounded-md">
        <h3 className="select-none text-[14px] md:text-[15px] font-semibold">
          Add to your post
        </h3>
        <div className="flex items-center gap-0">
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            onClick={() => setOpenSelectFile(prev=>!prev)}
          >
            <img src={ImageVideoIcon} alt="image" className="w-5 md:w-6"/>
          </div>
          <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
            <img src={TagFriendsIcon} alt="image" className="w-5 md:w-6"/>
          </div>
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            ref={feelingModelRef}
            onClick={() => setModelOpen((prev) => !prev)}
          >
            <img src={FeelingsIcon} alt="image" className="w-5 md:w-6"/>
            {modelOpen && <FeelingsModel />}
          </div>
          <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
            <img src={LocationsIcon} alt="image" className="w-5 md:w-6"/>
          </div>
          <div
            className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none"
            onClick={() => setGiphyModel(true)}
          >
            <img src={GifIcon} alt="image" className="w-5 md:w-6"/>
          </div>
         {giphyModel && <Giphy setGiphyModel={setGiphyModel} />}
        </div>
      </div>
    </div>
  );
};

export default AddToUserPost;
