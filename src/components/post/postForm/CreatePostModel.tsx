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
import CreatePostHeader from "@/components/post/postForm/CreatePostHeader";
import { IUserDoc } from "@/interfaces/auth.interface";
import CreateInput from "@/components/post/postForm/CreateInput";
import SelectBgAndEmoji from "@/components/post/postForm/SelectBgAndEmoji";
import AddToUserPost from "@/components/post/postForm/AddToUserPost";
import { IFeelings, IFiles, IPrivacy } from "@/interfaces/post.interface";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { clearPost } from "@/store/reducers/SinglePostReducer";
import { ImageUtils } from "@/services/utils/imageUtils";
import useMutationCustom from "@/hooks/useMutationCustom";
import { createPostApi, updatePostApi } from "@/services/http";

const CreatePostModel = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { type, isOpen } = useSelector((store: RootState) => store.model);
  const {
    _id,
    privacy,
    feelings,
    post,
    gifUrl,
    bgColor,
    files: oldFiles,
  } = useSelector((store: RootState) => store.SinglePost);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);

  const createPostMutation = useMutationCustom({
    mutationFn: createPostApi,
    onSuccess: ({ data }) => {
      toast({
        title: data.message,
      });
      dispatch(clearPost());
      dispatch(closeModel());
      setFiles([]);
    },
  });
  const updatePostMutation = useMutationCustom({
    mutationFn: (data) => updatePostApi(_id!, data),
    onSuccess: ({ data }) => {
      toast({
        title: data.message,
      });
      dispatch(clearPost());
      dispatch(closeModel());
    },
  });

  const createPost = () => {
    if (!post)
      return toast({
        title: "Post title is required.",
        variant: "destructive",
      });
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("privacy", `${privacy}`);
    formData.append("post", `${post}`);
    formData.append("feelings", `${feelings}`);
    formData.append("gifUrl", `${gifUrl}`);
    formData.append("bgColor", `${bgColor}`);
    if (type === "createPost") {
      createPostMutation.mutate(formData);
    } else {
      updatePostMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (type === "editPost" && oldFiles) {
      oldFiles.map((fi: IFiles) => {
        ImageUtils.imageUrlToBlob(fi.path).then((blob) => {
          const imaFile = ImageUtils.imageBlobToFile(blob, fi.mimetype);
          setFiles([...files, imaFile]);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldFiles]);

  const loading = createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        dispatch(closeModel());
        dispatch(clearPost());
        setFiles([]);
      }}
    >
      <DialogContent className="max-w-[500px] p-0 cardBG">
        <DialogHeader>
          <DialogTitle className="text-center mt-4">
            {type === "createPost" ? "Create post" : "Update Post"}
          </DialogTitle>
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
                {type === "createPost" ? "Post..." : "Updating..."}
                <Loader2 className="animate-spin" size={20} />
              </span>
            ) : type === "createPost" ? (
              "Post"
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModel;
