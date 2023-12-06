// import React from "react";
import { Separator } from "@/components/ui/separator";
import PostImage from "@/assets/images/post_image.svg";
import Image from "../common/Image";

const profileImage =
  "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const AddPost = () => {
  return (
    <div className="cardBG md:mt-6 md:rounded-xl md:borderWrapper">
      <h3 className="hidden md:block tracking-[0.1px] text-[14px] pl-4 pt-4">
        Post Something
      </h3>
      <Separator className="my-4 hidden md:block" />

      <div className="px-4 py-4 md:px-4 md:pb-3 md:pt-0 flex justify-between items-center">
        <div className="flex gap-4 w-full">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src={profileImage} />
          </div>
          <div className="flex flex-1 gap-2 items-center p-2 border md:border-none rounded-lg cursor-pointer select-none">
            <span className="text-[#696974] flex-1 tracking-[0.1px] text-[16px] cursor-text">
              What&apos;s on your mind?
            </span>
            <div className="cursor-pointer">
              <img src={PostImage} alt="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
