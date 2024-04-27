import CoverImageAndProfileImage from "@/components/profile/item/CoverImageAndProfileImage";
import SinglePostInfo from "@/components/profile/item/SinglePostInfo";
import { IUserDoc } from "@/interfaces/auth.interface";
import React from "react";

interface Props {
  user:IUserDoc
}

const ProfileBar:React.FC<Props> = ({user}) => {
  return (
    <div className="w-full md:rounded-lg relative">
      <div className="cardBG w-full xl:w-full md:mx-auto h-[357px] md:h-[231px]">
        <CoverImageAndProfileImage user={user}/>
      </div>

      <div className="cardBG w-full px-4 flex items-center justify-center gap-x-2 xl:justify-end xl:pr-6">
        <SinglePostInfo active={true} count={12500} text="Post" />
        <SinglePostInfo active={false} count={650} text="Followers" />
        <SinglePostInfo active={false} count={20} text="Following" />
          <SinglePostInfo active={false} count={1000} text="Photos" />
        <div className="hidden md:flex items-center">
          <SinglePostInfo active={false} count={126500215} text="Likes" />
          <SinglePostInfo active={false} count={2500} text="Videos" />
          <SinglePostInfo active={false} count={1100} text="Saved" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
