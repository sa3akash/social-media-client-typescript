import React from "react";
import ProfileImage from "@/assets/default_avatar.png";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import ProfilewImageDialog from "@/components/profile/item/ProfilewImageDialog";
import { buttonVariants } from "@/components/ui/button";
import { IUserDoc, StoreImagProfile } from "@/interfaces/auth.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link, useLocation } from "react-router-dom";
import { useFollowUserMutation } from "@/store/rtk/friends/friendsSlice";

interface Props {
  user: IUserDoc;
  setProfileImg: React.Dispatch<React.SetStateAction<StoreImagProfile>>;
  profileImg: StoreImagProfile;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSection: React.FC<Props> = ({
  profileImg,
  setProfileImg,
  user,
  handleImage,
}) => {
  const { user: stateUser, following } = useSelector(
    (state: RootState) => state.auth
  );
  const userId = useLocation().pathname.split("/")[2];
  const followingReaction = following.some((id) => id === userId);
  const [followUser] = useFollowUserMutation();

  return (
    <div className="flex flex-col md:flex-row bottom-20 justify-between absolute w-full md:bottom-20 left-1 px-4 items-center xl:bottom-8 xl:px-8">
      <div className="flex items-center flex-col md:flex-row gap-2  ">
        <div className="w-[160px] h-[160px] select-none relative flex items-center justify-center">
          <img
            src={profileImg.profilePic || ProfileImage}
            className="rounded-full border-[6px] border-primary cardBG object-cover pointer-events-none w-full h-full"
          />
          {userId === stateUser?.authId && (
            <>
              <div
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "absolute right-1 bottom-4 w-10 h-10 rounded-full z-10 items-center justify-center p-0 cursor-pointer"
                )}
                onClick={() =>
                  setProfileImg((prev) => ({
                    ...prev,
                    openProfileModel: true,
                  }))
                }
              >
                <UploadCloud className="w-5 h-5" />
              </div>
              <ProfilewImageDialog
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                handleImage={handleImage}
              />
            </>
          )}
        </div>
        <div className="flex flex-col md:gap-4 md:h-full md:justify-end xl:justify-center items-center justify-center px-4">
          <div className="text-[#FAFAFB] flex md:flex-col gap-4 md:gap-0 items-center">
            <h3 className="font-semibold md:text-[24px] tracking-[0.1px] leading-9">
              {user?.name?.first} {user?.name?.last}
            </h3>
            <span className="roboto text-[14px] leading-6 tracking-[0.1px] md:w-full">
              @{user?.username}
            </span>
          </div>
          <p className="roboto md:text-[16px] md:hidden tracking-[0.1px] leading-6 w-full text-center md:text-start">
          {user.quote ? `“${user.quote}”` :
          `“Pushing pixels and experiences in digital
products for Sebostudio”`}
          </p>
        </div>
      </div>
      {stateUser?.authId !== userId ? <div className="py-4 text-center space-x-4">
        <button
          className={cn(
            "px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all bg-gray-500 hover:bg-gray-500 border-gray-500",
            followingReaction
              ? "bg-[#1E75FF] hover:bg-[#1e80ff] border-[#1E75FF]"
              : "bg-transparent",
          )}
          onClick={() => followUser(userId)}
        >
          {followingReaction ? "following" : "follow"}
        </button>
        <button className="px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all bg-gray-500 hover:bg-gray-500 border-gray-500">
          block
        </button>
      </div> : (
        <div className="py-4 text-center space-x-4">
        <Link to='/settings?tab=account'
          className="px-4 py-1 border-[2px] rounded-full font-semibold text-[12px] select-none transition-all bg-[#1E75FF] hover:bg-[#1e80ff] border-[#1E75FF]"
          
        >
          Edit profile
        </Link>
       
      </div>

      )}
    </div>
  );
};

export default ProfileSection;
