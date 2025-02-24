import { Button } from "@/components/ui/button";
import { IUserDoc, StoreImagProfile } from "@/interfaces/auth.interface";
import React, { useEffect, useRef } from "react";
import CoverImage from "@/assets/defaultCover.jpg";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

import { setAuth } from "@/store/reducers/AuthReducer";
import { useUpdateProfileCoverMutation } from "@/store/rtk/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useUpload } from "@/hooks/upload/useUpload";

interface Props {
  user: IUserDoc;
  setProfileImg: React.Dispatch<React.SetStateAction<StoreImagProfile>>;
  profileImg: StoreImagProfile;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CoverImageAndProfileImage: React.FC<Props> = ({ user, setProfileImg, profileImg,handleImage }) => {


  const coverRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { user: stateUser } = useSelector((state: RootState) => state.auth);

  const { uploadFile,uploading } = useUpload()

  const {toast} = useToast()

  useEffect(() => {
    setProfileImg((prev) => ({
      ...prev,
      profilePic: user.profilePicture,
      coverPic: user.coverPicture,
    }));
  }, [setProfileImg, user.coverPicture, user.profilePicture]);

 

  const [updateProfileCover] =
    useUpdateProfileCoverMutation();

  const handleSaveCoverImage = () => {
    if (profileImg.coverPicRow) {
      uploadFile(profileImg.coverPicRow).then((data)=>{

        updateProfileCover({url:data.url})

        const mainObj = { ...stateUser, coverPicture: data.url } as IUserDoc;
        dispatch(setAuth(mainObj));
        setProfileImg((prev) => ({ ...prev, coverPicRow: null }));
        toast({
          title: data.message,
        });
      });
      
      
    }
  };

  const location = useLocation().pathname.split("/")[2];

  const handleCencelCover = () => {
    setProfileImg((prev) => ({
      ...prev,
      coverPicRow: null,
      coverPic: user.coverPicture,
    }));
  };

  return (
    <div className="w-full h-full">
      <div
        className="h-[40%] md:h-[78%] xl:h-full bg-background relative  z-0 rounded-lg md:rounded-none"
        style={{
          backgroundImage: `url(${profileImg.coverPic || CoverImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <>
          {location === stateUser?.authId &&
            (profileImg.coverPicRow ? (
              <div className="flex items-center gap-2 transition-all font-semibold text-[12px] absolute top-4 right-4 select-none">
                <Button variant="destructive" onClick={handleCencelCover}>
                  Cancel
                </Button>
                <Button
                  onClick={() => coverRef.current?.click()}
                  disabled={uploading}
                >
                  Change
                </Button>
                <Button onClick={handleSaveCoverImage} disabled={uploading}>
                  {uploading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-5" /> Loading...
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                className="transition-all font-semibold text-[12px] absolute top-4 right-4 select-none"
                onClick={() => coverRef.current?.click()}
                disabled={uploading}
              >
                Edit Cover
              </Button>
            ))}
        </>

        <div className="bg-gradient-to-t from-[#000000ea] absolute bottom-0 w-full left-0 h-24" />
        <input
          onChange={handleImage}
          type="file"
          name="coverPicRow"
          ref={coverRef}
          hidden
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default CoverImageAndProfileImage;

// absolute left-0 w-full top-[80px] md:top-[50px] md:left-4 xl:bottom-6 xl:left-6 2xl:top-[100px]
