import React from "react";
import ArrowDown from "@/assets/images/ic_Dropdown2.svg";

const PhotosHeader = () => {
  return (
    <div className=" flex items-start justify-between" >
      <div className="flex items-center gap-4">
        <h2 className="hidden md:block font-semibold text-[24px] leading-9 tracking-[0.1px]">
          Your Photos
        </h2>
        <div className="flex items-center gap-2">
          <span className="hidden md:block roboto text-[18px] tracking-[0.1px] text-[#696974]">
            Show:
          </span>
          <div className="cursor-pointer select-none flex items-center gap-2">
            <span className="roboto text-[18px] font-semibold tracking-[0.1px] text-[#B5B5BE]">
              My Photos
            </span>
            <img src={ArrowDown} alt="icon" />
          </div>
        </div>
      </div>
      <div>
        <div className="cardBG flex items-center w-full h-full px-4 py-2 rounded-lg">
          <span className="hidden md:block roboto text-[18px] tracking-[0.1px] text-[#696974]">
          Sort by:
          </span>
          <div className="cursor-pointer select-none flex items-center gap-4">
            <span className="roboto text-[18px] font-semibold tracking-[0.1px] text-[#B5B5BE] border-r px-3">
            Newest Post
            </span>
            <img src={ArrowDown} alt="icon" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PhotosHeader;
