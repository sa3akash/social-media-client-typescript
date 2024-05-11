import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import useMutationCustom from "@/hooks/useMutationCustom";
import { IUserDoc, StoreImagProfile } from "@/interfaces/auth.interface";
import { updateProfileImage } from "@/services/http";
import { AppDispatch, RootState } from "@/store";
import { setAuth } from "@/store/reducers/AuthReducer";
import { Loader2, UploadCloud } from "lucide-react";
import React, { useRef } from "react";
import { Cropper, CircleStencil, CropperRef } from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  profileImg: StoreImagProfile;
  setProfileImg: React.Dispatch<React.SetStateAction<StoreImagProfile>>;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilewImageDialog: React.FC<Props> = ({
  profileImg,
  handleImage,
  setProfileImg,
}) => {
  const profileRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const mutation = useMutationCustom({
    mutationFn: updateProfileImage,
    onSuccess: ({ data }) => {
      const mainOb: IUserDoc = {
        ...user,
        profilePicture: data.url,
      } as IUserDoc;
      dispatch(setAuth(mainOb));
      toast({
        title: data.message,
      });
      setProfileImg((prev) => ({
        ...prev,
        openProfileModel: false,
        profileRow: null,
        profilePic: data.url,
      }));
    },
  });

  const makeNewImageAndUpdate = () => {
    if (cropperRef.current) {
      // as src for <img/> to preview result
      // console.log(cropperRef.current.getCanvas()?.toDataURL());
      // setProfileImg((prev) => ({
      //   ...prev,
      //   profilePic: cropperRef.current?.getCanvas()?.toDataURL() as string,
      // }));

      const canvas = cropperRef.current?.getCanvas();
      if (canvas) {
        const form = new FormData();
        canvas.toBlob((blob) => {
          if (blob) {
            form.append("file", blob);
            mutation.mutate(form);
          }
        }, "image/jpeg");
      }
    }
  };

  const modelOff = () => {
    setProfileImg((prev) => ({
      ...prev,
      openProfileModel: false,
      profileRow: null,
      profilePic: user?.profilePicture as string,
    }));
  };

  return (
    <Dialog open={profileImg.openProfileModel} onOpenChange={modelOff}>
      <DialogContent className="max-w-[500px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Edit and crop profile picture</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[400px]">
          {profileImg.profileRow ? (
            <Cropper
              src={profileImg.profilePic}
              ref={cropperRef}
              // className="cropper w-full object-cover"
              stencilComponent={CircleStencil}
              stencilProps={{ aspectRatio: 1 / 1 }}
              className="h-[400px] cropper"
            />
          ) : (
            <div>
              <div
                className="w-full h-[200px] border-dashed border-primary border rounded-md p-4 items-center justify-center group flex gap-2"
                onClick={() => profileRef.current?.click()}
              >
                <UploadCloud className="w-8 h-8" />
                <span>
                  <b className="group-hover:underline">Choose a file</b> or Drag
                  and Drop
                </span>
              </div>
            </div>
          )}
          <input
            onChange={handleImage}
            type="file"
            name="profileRow"
            ref={profileRef}
            hidden
          />
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={modelOff}>
            Cancel
          </Button>
          <Button
            onClick={() => profileRef.current?.click()}
            disabled={mutation.isPending}
          >
            Change
          </Button>
          <Button
            type="submit"
            onClick={makeNewImageAndUpdate}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-1">
                <Loader2 className="w-5 animate-spin" /> Loading...
              </span>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilewImageDialog;
