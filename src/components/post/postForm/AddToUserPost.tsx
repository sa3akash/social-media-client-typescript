
import ImageVideoIcon from "@/assets/icons/imageIcon.png";
import TagFriendsIcon from "@/assets/icons/tagFriendIcon.png";
import FeelingsIcon from "@/assets/icons/feelingsICon.png";
import LocationsIcon from "@/assets/icons/locationIcon.png";
import GifIcon from "@/assets/icons/gifIcon.png";
import FeelingsModel from "./FeelingsModel";
import useDetectOutsideClick from "@/hooks/useDetactOutsideClick";
import { useRef } from "react";

const AddToUserPost = () => {

  const divRef = useRef(null)
  const [modelOpen,setModelOpen] = useDetectOutsideClick(divRef,false)

  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-2 px-4 py-2 border rounded-md">
      <h3 className="select-none text-[15px] font-semibold">Add to your post</h3>
      <div className="flex items-center gap-0">
        <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
          <img src={ImageVideoIcon} alt="image" />
        </div>
        <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
          <img src={TagFriendsIcon} alt="image" />
        </div>
        <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none" ref={divRef} onClick={()=>setModelOpen(prev=>!prev)}>
          <img src={FeelingsIcon} alt="image" />
          {modelOpen && <FeelingsModel />}
        </div>
        <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
          <img src={LocationsIcon} alt="image" />
        </div>
        <div className="rounded-full p-2 hover:bg-secondary cursor-pointer select-none">
          <img src={GifIcon} alt="image" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddToUserPost;
