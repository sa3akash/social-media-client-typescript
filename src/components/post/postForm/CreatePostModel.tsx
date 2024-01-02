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
import { api } from "@/services/http/api";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const CreatePostModel = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { type, isOpen } = useSelector((store: RootState) => store.model);
  const { privacy, feelings, post, gifUrl, bgColor } = useSelector(
    (store: RootState) => store.SinglePost
  );
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const createPost = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("privacy", `${privacy}`);
    formData.append("post", `${post}`);
    formData.append("feelings", `${feelings}`);
    formData.append("gifUrl", `${gifUrl}`);
    formData.append("bgColor", `${bgColor}`);
    api.createPost(formData, toast, setFiles, setLoading);
  };

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
          <CreateInput files={files} setFiles={setFiles} />
          <SelectBgAndEmoji />
          <AddToUserPost setFiles={setFiles} />
        </div>
        <DialogFooter className="px-4 pb-4">
          <Button
            type="submit"
            className="w-full disabled:cursor-not-allowed"
            onClick={createPost}
            disabled={loading}
          >
              {loading ? (
                <span className="flex text-center gap-2">
                  Post...
                  <Loader2 className="animate-spin" size={20} />
                </span>
              ) : (
                "Post"
              )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModel;
