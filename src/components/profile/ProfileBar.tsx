import CoverImageAndProfileImage from "@/components/profile/item/CoverImageAndProfileImage";
import SinglePostInfo from "@/components/profile/item/SinglePostInfo";
import { IFullUserDoc, StoreImagProfile } from "@/interfaces/auth.interface";
import { ImageUtils } from "@/services/utils/imageUtils";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import ProfileSection from "./item/ProfileSection";

interface Props {
  user: IFullUserDoc;
}

const ProfileBar: React.FC<Props> = ({ user }) => {
  const { toast } = useToast();

  const [profileImg, setProfileImg] = useState<StoreImagProfile>({
    profilePic: "",
    profileRow: null,
    coverPic: "",
    coverPicRow: null,
    openProfileModel: false,
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file && file.type.includes("image")) {
      ImageUtils.readAsBase64(file)
        .then((data) => {
          if (e.target.name === "coverPicRow") {
            setProfileImg((prev) => ({
              ...prev,
              [e.target.name]: file,
              coverPic: data as string,
            }));
          } else {
            setProfileImg((prev) => ({
              ...prev,
              [e.target.name]: file,
              profilePic: data as string,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <div className="w-full md:rounded-lg relative">
      <div className="cardBG w-full xl:w-full md:mx-auto h-[350px] md:h-[220px]">
        <CoverImageAndProfileImage
          user={user}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          handleImage={handleImage}
        />
      </div>

      <div className="cardBG border-t w-full px-4 flex items-center justify-center gap-x-2 xl:justify-end xl:pr-6">
        <div className="flex items-center justify-center md:justify-end w-full 2xl:w-[60%]">
          <SinglePostInfo active={true} count={user.postsCount} text="Post" />
          <SinglePostInfo
            active={false}
            count={user.followersCount}
            text="Followers"
          />
          <SinglePostInfo
            active={false}
            count={user.followingCount}
            text="Following"
          />
          <SinglePostInfo active={false} count={1000} text="Photos" />
          <div className="hidden md:flex xl:hidden 2xl:flex items-center">
            <SinglePostInfo active={false} count={126500215} text="Likes" />
            <SinglePostInfo active={false} count={2500} text="Videos" />
            <SinglePostInfo active={false} count={1100} text="Saved" />
          </div>
        </div>
      </div>

      <ProfileSection
        user={user}
        setProfileImg={setProfileImg}
        profileImg={profileImg}
        handleImage={handleImage}
      />
    </div>
  );
};

export default ProfileBar;
