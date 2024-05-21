import { Button, buttonVariants } from "@/components/ui/button";
import { IUserDoc, StoreImagProfile } from "@/interfaces/auth.interface";
import React, { useEffect, useRef, useState } from "react";
import CoverImage from "@/assets/defaultCover.jpg";
import ProfileImage from "@/assets/defaultProfile.jpg";
import { ImageUtils } from "@/services/utils/imageUtils";
import { toast } from "@/components/ui/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import ProfilewImageDialog from "@/components/profile/item/ProfilewImageDialog";
import { setAuth } from "@/store/reducers/AuthReducer";
import useMutationCustom from "@/hooks/useMutationCustom";
import { updateProfileCover } from "@/services/http";

interface Props {
  user: IUserDoc;
}

const CoverImageAndProfileImage: React.FC<Props> = ({ user }) => {
  const [profileImg, setProfileImg] = useState<StoreImagProfile>({
    profilePic: "",
    profileRow: null,
    coverPic: "",
    coverPicRow: null,
    openProfileModel: false,
  });

  const coverRef = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { user: stateUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setProfileImg((prev) => ({
      ...prev,
      profilePic: user.profilePicture || ProfileImage,
      coverPic: user.coverPicture || CoverImage,
    }));
  }, [user.coverPicture, user.profilePicture]);

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

  const mutation = useMutationCustom({
    mutationFn: updateProfileCover,
    onSuccess: ({ data }) => {
      const mainObj = { ...stateUser, coverPicture: data.url } as IUserDoc;
      dispatch(setAuth(mainObj));
      setProfileImg((prev) => ({ ...prev, coverPicRow: null }));
      toast({
        title: data.message,
      });
    },
  });

  const handleSaveCoverImage = () => {
    if (profileImg.coverPicRow) {
      const form = new FormData();
      form.append("file", profileImg.coverPicRow);
      mutation.mutate(form);
    }
  };

  const { user: rootUser } = useSelector((state: RootState) => state.auth);

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
        className="h-[50%] md:h-full bg-background relative overflow-hidden z-0 rounded-lg md:rounded-none"
        style={{
          backgroundImage: `url(${profileImg.coverPic})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <>
          {location === rootUser?.authId &&
            (profileImg.coverPicRow ? (
              <div className="flex items-center gap-2 transition-all font-semibold text-[12px] absolute top-4 right-4 select-none">
                <Button variant="destructive" onClick={handleCencelCover}>
                  Cancel
                </Button>
                <Button
                  onClick={() => coverRef.current?.click()}
                  disabled={mutation.isPending}
                >
                  Change
                </Button>
                <Button
                  onClick={handleSaveCoverImage}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
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
                disabled={mutation.isPending}
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

      <div className="absolute left-0 w-full top-[80px] md:top-[50px] md:left-4 xl:bottom-6 xl:left-6 2xl:top-[100px] flex justify-center">
        <div className="flex items-center flex-col w-full md:flex-row gap-2">
          <div className="w-[160px] h-[160px] select-none relative flex items-center justify-center">
            <img
              src={profileImg.profilePic}
              className="rounded-full border-[6px] border-primary cardBG object-cover pointer-events-none w-full h-full"
            />
            {location === rootUser?.authId && (
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
              {user.quote ||
                `“Pushing pixels and experiences in digital
              products for Sebostudio”`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverImageAndProfileImage;
