import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModel } from "@/store/reducers/ModelReducer";
import { Separator } from "@/components/ui/separator";
import CreatePostHeader from "./CreatePostHeader";
import { IUserDoc } from "@/interfaces/auth.interface";
import CreateInput from "./CreateInput";
import SelectBgAndEmoji from "./SelectBgAndEmoji";
import AddToUserPost from "./AddToUserPost";
import { IFeelings, IPrivacy } from "@/interfaces/post.interface";
import { useState } from "react";

const CreatePostModel = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { type, isOpen } = useSelector((store: RootState) => store.model);
  const { privacy, feelings } = useSelector(
    (store: RootState) => store.SinglePost
  );
  const dispatch: AppDispatch = useDispatch();

  const [files, setFiles] = useState<File[]>([]);

  console.log(files);

  return (
    <Dialog
      open={type === "createPost" && isOpen}
      onOpenChange={() => dispatch(closeModel())}
    >
      <DialogContent className="max-w-[500px] p-0 cardBG">
        <DialogHeader>
          <DialogTitle className="text-center mt-4">Create post</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="relative">
          <CreatePostHeader
            user={user as IUserDoc}
            privacy={privacy as IPrivacy}
            feelings={feelings as IFeelings}
          />
          <CreateInput files={files} setFiles={setFiles}/>
          <SelectBgAndEmoji />
          <AddToUserPost setFiles={setFiles} />
        </div>
        <DialogFooter className="px-4 pb-4">
          <Button type="submit" className="w-full">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModel;
